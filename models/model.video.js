const baseModel = require('./base.model');
const UserModel = require('./model.user');
const vimeo = require('../services/vimeo');

module.exports = baseModel({
  name: 'Video',
  data:{
    uri: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    raw: {
      type: Object,
      required: true
    },
    name: {
      type: String
    },
    foundOnChannel: {
      type: String
    },
    foundOnCategory: {
      type: String
    },
    createdTime: {
      type: Date
    },
    credits: {
      type: Number
    },
    creditsRaw: {
      type: Object
    },
  },
  validate(next){
    if(this.isNew){
      this.uri = this.raw.uri;
      this.name = this.raw.name;
      this.createdTime = this.raw.created_time;
      try{
        this.credits = this.raw.metadata.connections.credits.total;
      } catch(e){
        console.log('Error getting credits', this.raw.metadata.connections);
      }
    }
    next();
  },
  async onCreate(){
    console.log('Added video', this.name, this._id);
    if(this.raw.user){
      await this.ensureOwnerExists();
    }
  },
  methods: {
    async ensureOwnerExists(){
      const exists = await UserModel.countDocuments({
        uri: this.raw.user.uri
      });
      if(!exists){
        const user = new UserModel({raw: this.raw.user});
        await user.addCredit({ video: this.uri })
      }
    },
    async loadCredits(){
      const credits = await vimeo.request(`${this.uri}/credits`);
      if(credits && credits.data){
        this.creditsRaw = credits.data;
        await this.save();
        await this.ensureCreditsExist();
      }else{
        console.log('error?');
      }
    },
    async ensureCreditsExist(){
      for(const credit of this.creditsRaw) {
        if(credit.user){
          let user = await UserModel.findOne({uri: credit.user.uri});
          if(!user){
            // Create the new user
            user = new UserModel({raw: credit.user});
          }
          await user.addCredit({
            video: this.uri,
            name: credit.name,
            role: credit.role
          })
        }else{
          // This is a credit for a person
          // who has no Vimeo user account
        }
      }
    }
  }
});
