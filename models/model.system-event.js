const mongoose = require('mongoose');
const SystemEventTypeModel = require('./model.system-event-type');
const baseModel = require('./base.model');

module.exports = baseModel({
  name: 'SystemEvent',
  data: {
    objectType: {
      type: String,
      required: true
    },
    eventType: {
      type: String,
      required: true
    },
    target: {
      type: Object,
      required: true
    },
    data: {
      type: Object
    }
  },
  validate: async function(next){
    // Make sure that this is a valid SystemEvent by
    // comparing it to the SystemEventTypes
    const validate = SystemEventTypeModel.validate(this);
    if(validate){
      next()
    }else{
      next(validate)
    }
  },
  onCreate(){
    this.callListeners();
  },
  methods: {
    callListeners: async function(){

      // Get the model and event handler name
      // IE: Visit.onLinkOpen
      const model = this.model(this.objectType);
      const eventHandlerName = `on${this.eventType}`;

      // Stop executing if event is a standard lifecycle event
      if(['Create','Modify','Delete'].includes(this.eventType)){
        return;
      }

      // See if this model has an event handler defined
      if(Object.keys(model.schema.methods).includes(eventHandlerName)){

        // Theres's an event handler for this particular event.
        // Get an instance of the model
        const object = await model.findById(this.target._id,'_id');

        // Call the event handler with the event data
        await object[eventHandlerName](this.data);
      }
    }
  }
});
