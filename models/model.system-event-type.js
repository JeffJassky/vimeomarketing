const mongoose = require('mongoose');
const handlebars = require('handlebars');
handlebars.registerHelper('ifEquals', function(a, b, options) {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
});

const validSystemEventTypes = require('../database/initialData/system-event-types');
let systemEventTypes = [];

const validateIsValidHandlebarsTemplate = {
  validator: function(template) {
    console.debug('validating handlebars template');
    try{
      handlebars.precompile(template);
    }catch(e){
      return false
    }
    return true
  },
  message: props => `${props.value} is not a valid Handlebars template.`
};


const schema = mongoose.Schema({
  objectType: {
    type: String
  },
  eventType: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  optional: {
    type: Boolean
  },
  debounceNotifications: {
    type: Number,
    default: 0
  },
  notificationTemplate: mongoose.Schema({
    title: {
      type: String,
      required: true,
      validate: validateIsValidHandlebarsTemplate
    },
    message: {
      type: String,
      required: true,
      validate: validateIsValidHandlebarsTemplate
    },
    icon: {
      type: String,
      required: true,
      validate: validateIsValidHandlebarsTemplate
    },
    link: {
      type: String,
      required: false,
      validate: validateIsValidHandlebarsTemplate
    },
    image: {
      type: String,
      required: false,
      validate: validateIsValidHandlebarsTemplate
    },
  }),
  notificationDefaults: {
    type: Object,
    required: true,
    default: {
      admin: {
        standard: true,
        email: true,
        sms: true
      },
      owner: {
        standard: true,
        email: true,
        sms: true
      },
      manager: {
        standard: true,
        email: true,
        sms: true
      },
      member: {
        standard: true,
        email: true,
        sms: true
      },
      client: {
        standard: true,
        email: true,
        sms: true
      }
    }
  }
}, {
  timestamps: true,
  usePushEach: true
});

schema.pre('validate', async function(next){
  const validate = this.constructor.validate(this);
  if(validate){
    next()
  }else{
    next(validate)
  }
});

schema.statics.validate = function(document){
  const isValid = validSystemEventTypes.find(validSystemEventType => {
    return (
      validSystemEventType.objectType === document.objectType &&
      validSystemEventType.eventType === document.eventType
    )
  });
  return isValid ? true : new Error(`No SystemEventType registered for ${document.objectType}/${document.objectType}`);
};

schema.statics.findCached = () => systemEventTypes;
schema.statics.findByName = name => systemEventTypes.find(e => e.name === name);

schema.statics.findByObjectTypeAndEventType = function(objectType, eventType) {
  return systemEventTypes.find(e => e.objectType === objectType && e.eventType === eventType) || null;
};

schema.statics.getNotificationDefaults = function(objectType, eventType) {
  const systemEventType = this.findByObjectTypeAndEventType(objectType, eventType);
  return systemEventType ? systemEventType.notificationDefaults : null;
};

schema.statics.getSubscriptionOptionsForRoles = function(roles){
  const subscribableSystemEventTypes = [];
  this.findCached().filter(e => e.optional).forEach(systemEventType => {
    const defaults = systemEventType.notificationDefaults || null;
    if(defaults){
      const subscribableSystemEventType = {
        title: systemEventType.name,
        name: `${systemEventType.objectType}${systemEventType.eventType}`,
        description: systemEventType.description,
        options: []
      }
      roles.forEach(role => {
        if(defaults[role]){
          Object.keys(defaults[role]).forEach(subscriptionType => {
            if(!subscribableSystemEventType.options.includes(subscriptionType)){
              subscribableSystemEventType.options.push(subscriptionType)
            }
          })
        }
      });
      subscribableSystemEventTypes.push(subscribableSystemEventType)
    }
  });
  return subscribableSystemEventTypes;
}

const model = db.model('SystemEventType', schema);
//
// console.log('SYSTEM EVENT SETUP START');
// model.find().then(foundSystemEventTypes => {
//   systemEventTypes = foundSystemEventTypes;
//   console.log(`SYSTEM EVENT SETUP COMPLETE WITH ${systemEventTypes.length} SystemEventTypes`);
// });

module.exports = model;
