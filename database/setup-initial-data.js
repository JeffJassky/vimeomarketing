require('../models/model.system-event');

module.exports = async function(){
  console.log('INITIAL DATA SETUP STARTING');

  // Setup System Event Types
  const SystemEventTypeModel = require('../models/model.system-event-type');
  const defaultSystemEventTypes = require('./initialData/system-event-types');
  await Promise.all(defaultSystemEventTypes.map(async defaultSystemEventType => {
    const exists = await SystemEventTypeModel.exists({
      objectType: defaultSystemEventType.objectType,
      eventType: defaultSystemEventType.eventType
    })
    if(!exists){
      console.log('Creating SystemEventType', defaultSystemEventType.name)
      return await new SystemEventTypeModel(defaultSystemEventType).save();
    }
  }));

  console.log('INITIAL DATA SETUP COMPLETE');
}
