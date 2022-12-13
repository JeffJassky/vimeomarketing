const mongoose = require('mongoose');
const randomstring = require('randomstring');
const softDelete = require('mongoose-delete');

module.exports = function(config){
  config.disableLifecycleEvents = true;

  if(config.watch) {
    // Set up mongoose field "setters" for watched fields.
    // This stores the previous value of field in a prop called
    // _field any time the field is set.
    // This is used in the pre('save') to dispatch watchers
    // with both newValue and oldValue parameters
    //
    // Method documented here:
    // https://coderwall.com/p/xe2m9a/expose-previous-values-in-mongoose
    // https://stackoverflow.com/questions/11436071/does-mongoose-provide-access-to-previous-value-of-property-in-presave

    Object.keys(config.watch).forEach(function(field){
      if(config.data[field]){
        if(config.data[field].type){
          config.data[field].set = function(value){
            // Store a snapshot of the current object state in a field
            // prefixed with an underscore
            // IE: this._fieldName
            this[`_${field}`] = this.toJSON({virtuals: true});
            return value;
          };
        }else{
          console.warn(`Watcher for ${config.name}.${field} will not include previous value.`);
        }
      }else{
        console.error(`Cannot apply watcher to ${config.name}.${field} because it is not defined in the schema.`);
      }
    })
  }

  // Add wasNew field to schema
  // This is used to detect a newly created document
  // in a post('save') hook primarily for creating (ModelName)Create SystemEvents
  config.data.wasNew = {
    type: Boolean,
    default: true
  }

  // Add systemEvents field to schema
  // This is used to store systemEvents
  // dispatched via model.$emit
  config.data.systemEvents = [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SystemEvent'
  }]

  // Add "slug" field to schema
  // This is used to automatically generate unique slugs for each document
  if(config.slug){
    config.data.slug = {
      type: String,
      required: true
    }
  }

  // Initialize the Mongoose Schema object
  const schema = mongoose.Schema(
    config.data,
    {
      timestamps: true,
      usePushEach: true
    }
  );

  // Third party plugins
  schema.plugin(softDelete, {
    deletedAt: true,
    overrideMethods: true
  });

  // Set up Mongoose Virtuals as "computed" properties
  if(config.computed){
    Object.keys(config.computed).forEach(name => {
      // Currently supports GET only. No SET.
      schema.virtual(name).get(config.computed[name])
    });

    // Include virtual in search results by default
    schema.set('toJSON', {virtuals: true});
  }

  // Set up automatic generation of short, unique slugs
  if(config.slug){
    // Slug method
    schema.methods.$generateSlug = async function(value){
      const dashedCase = value.toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
      const slug = dashedCase +'-'+ randomstring.generate(6).toUpperCase();
      const exists = await this.constructor.countDocuments({slug});
      if(exists > 0){
        const newSlug = await this.$generateSlug(value);
        return newSlug;
      }else{
        return slug;
      }
    }
  }

  // ======== PRE-VALIDATE HOOK ===========
  schema.pre('validate', async function(next){
    // Handle slugging
    if(config.slug){
      this.slug = await this.$generateSlug(this.name);
    }
    if(config.validate){
      // If a validate method has been defined
      // Call it
      await config.validate.call(this, next);
    }else{
      // Validated. Move on to pre-saving.
      next();
    }
  });


  // ======== PRE-SAVE HOOK ===========
  schema.pre('save', function (next) {
    // Set up the pre('save') hook to set wasNew property
    this.wasNew = this.isNew;
    if(!this.wasNew){
      // Delete/clean up now that we're done with wasNew
      delete this.wasNew
    }
    // Prepare for watchers by capturing
    // the paths that have been modified before saving
    if(this.wasNew){
      // This is a new object
      // All paths have been modified
      this.$modifiedPaths = Object.keys(config.data);
    }else{
      // This is an update
      // Only modified paths
      this.$modifiedPaths = this.modifiedPaths();
    }
    if(config.beforeCreate && this.isNew){
      // If "beforeCreate" has been defined let's call it
      config.beforeCreate.call(this, next)
    }else{
      next();
    }
  });

  // ======== POST-SAVE HOOK ===========
  schema.post('save', async function(document) {
    // this.$trxs ? console.debug('PostSave for', this.$tid) : null;
    const postSavePromises = [];

    // Handle calling onCreate method
    if(this.wasNew){
      if(config.onCreate){
        // console.debug('Pushing onCreate to $postSavePromises');
        // Call onCreate method
        // and add it to the postSavePromise stack
        postSavePromises.push(
          config.onCreate.call(this, document)
        )
      }else{
        // Default lifecycle event
        if(!config.disableLifecycleEvents){
          await this.$emit('Create');
        }
      }
    }else{
      // console.debug(this);
      if(!config.disableLifecycleEvents) {
        if (this.$modifiedPaths.includes('deleted') && this.deleted) {
          postSavePromises.push(
            this.$emit('Delete')
          );
        } else {
          postSavePromises.push(
            this.$emit('Modify', {
              changes: this.$modifiedPaths
            })
          );
        }
      }
    }



    // Handle calling all watcher methods
    if(config.watch){
      this.$modifiedPaths.map(modifiedFieldName => {
        if(config.watch.hasOwnProperty(modifiedFieldName)){
          // a watcher is set for this field
          // Call watcher method
          // and add it to the postSavePromise stack
          postSavePromises.push(
            config.watch[modifiedFieldName].call(
              this, // model context
              this[modifiedFieldName], // new field value
              this[`_${modifiedFieldName}`] // previousDocument
            )
          );
        }
      });
    }

    // Handle transaction resolving/rejecting
    if(this.$trxs){
      // console.debug('postSavePromises for', this.$tid, postSavePromises.length)
      Promise.all(postSavePromises).then(results => {
        // Resolve if all postSavePromises resolve
        // console.debug('Resolving', this.$tid, results);
        this.$trxs[this.$tid].resolve(results);
      }).catch(e => {
        // Reject if any postSavePromises reject
        // console.debug('Rejecting', this.$tid, e);
        this.$trxs[this.$tid].reject(e);
      })
    }
  });


  // ======== PRE-DELETE HOOK ===========
  if(config.beforeDelete){
    schema.pre('remove', config.beforeDelete)
  }
  // ======== POST-DELETE HOOK ===========
  if(config.onDelete){
    schema.post('remove', config.onDelete);
  }else{
    // Default lifecycle event
    schema.post('remove', function(){
      this.$emit('HardDelete');
    });
  }

  // Set up standard Mongoose model methods
  if(config.methods){
    Object.keys(config.methods).forEach(methodName => {
      schema.methods[methodName] = config.methods[methodName]
    })
  }

  // Set up standard Mongoose model statics
  if(config.statics){
    Object.keys(config.statics).forEach(methodName => {
      schema.statics[methodName] = config.statics[methodName]
    })
  }

  // Set up SystemEvent listeners
  if(config.listen){
    Object.keys(config.listen).forEach(eventName => {
      schema.methods[eventName] = config.listen[eventName]
    })
  }

  // Set schema options
  if(config.setOptions){
    Object.keys(config.setOptions).forEach(key => {
      schema.set(key, config.setOptions[key])
    })
  }

  schema.methods.getDepopulatedObject = function(){
    return this.toJSON({
      virtuals: true,
      depopulate: true
    })
  };

  // $emit is a shortcut method for dispatching SystemEvents
  // Useful mostly within watchers and in API controllers
  schema.methods.$emit = async function(eventType, payload){
    // Create the systemEvent
    if(!this.model){
      // This must be an embedded document.
      // Disable events and lifecycle hooks
      return false
    }
    const systemEvent = await this.model('SystemEvent')({
      objectType: config.name,
      eventType,
      target: this.getDepopulatedObject(),
      data: payload
    }).save();
    // push systemEvent onto models systemEvent stack
    // and propagate the event up the model chain
    this.$propagateEvent(systemEvent);
    return systemEvent;
  };

  // $propagateEvent saves a systemEvent to an object
  // and propagates the event up the model chain via "refs"
  schema.methods.$propagateEvent = async function(systemEvent){
    // Push the systemEvent onto the model.systemEvents stack
    await this.updateOne({$addToSet: {
      systemEvents: systemEvent._id
    }});
    // loop over all parent "refs"
    return await Promise.all(Object.keys(config.data).map(async fieldName => {
      if(this[fieldName]){
        // Field is populated
        if(config.data[fieldName].type === mongoose.Schema.Types.ObjectId){
          // It's a parent from "refs"
          // get the parent object
          const parentModelName = config.data[fieldName].ref;
          const parentModel = this.model(parentModelName);
          const parentObject = await parentModel.findById(this[fieldName]);
          if(parentObject){
            // Propagate the event up the model chain
            await parentObject.$propagateEvent(systemEvent);
          }else{
            // console.debug(`could not find ${parentModelName} ${this[fieldName]}`)
          }
        }
      }
    }))
  }

  schema.methods.$deleteChildren = async function(models, foreignKey){
    foreignKey = foreignKey || config.name.toLowerCase();
    return await Promise.all(models.map(async modelName => {
      const conditions = {};
      conditions[foreignKey] = this._id;
      return (
        await this.model(modelName).find(conditions)
      ).map(item => item.remove())
    }));
  };


  // Similar to model.save()
  // but does not resolve until all post-save hooks
  // (onComplete and watchers) have resolved.
  // Returns array of all post-save hooks - NOT the object itself.
  schema.methods.saveComplete = function(options){
    this.$trxs = this.$trxs || [];
    this.$tid = this.$trxs.length;

    // console.debug('Creating new transaction', this.$tid, options);

    this.$trxs[this.$tid] = {
      promise: null,
      resolve: null,
      reject: null
    };
    this.$trxs[this.$tid].promise = new Promise((resolve, reject) => {
      this.$trxs[this.$tid].resolve = resolve;
      this.$trxs[this.$tid].reject = reject;
      // console.debug('Created transaction', this.$trxs[this.$tid]);
      this.save(options);
    }).then(() => {
      this.$tid--;
    }).catch(() => {
      this.$tid--;
    })

    return this.$trxs[this.$tid].promise
  };


  // generateUUID
  // Create unique IDs (within the collection itself)
  //
  schema.statics.generateUUID = async function(field, prefix){
    if(field){
      prefix = prefix || '';
      // Build the UUID
      const uuid = prefix + randomstring.generate(5).toUpperCase();

      // See if the UUID is in use
      const conditions = {};
      conditions[field] = uuid;
      const alreadyInUse = await this.exists(conditions);

      // If it's not alreadyInUse, return the uuid
      // if it is alreadyInUse, recursively generate a new one
      return !alreadyInUse ? uuid : this.generateUUID(field, prefix)
    }
    throw new Error('You must require a field in the collection to generate a UUID');
  };

  // Return a newly created schema
  return schema
};
