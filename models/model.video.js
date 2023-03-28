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
    description: {
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
        this.compressRaw();
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
    async compressRaw(){
      this.uri = this.raw.uri;
      this.name = this.raw.name;
      this.createdTime = this.raw.created_time;
      this.description = this.raw.description;
      try{
        const raw = {
          resource_key: this.raw.resource_key,
          categories: (this.raw.categories || []).map(c => {
            return {
              name: c.name,
              uri: c.uri
            }
          }),
          tags: this.raw.tags,
          picture: this.raw.pictures.sizes[this.raw.pictures.sizes.length-1].link,
          download: this.raw.privacy.download,
          created_time: this.raw.created_time,
          height: this.raw.height,
          width: this.raw.width,
          duration: this.raw.duration
        }
        if(this.wasNew){
          raw.user = this.raw.user
        }else{
          if(this.raw.user){
            raw.user = this.raw.user.uri
          }
        }
        try {
          this.credits = this.raw.metadata.connections.credits.total;
        } catch(e){
          console.log('Error getting credits', this.raw.metadata.connections, e);
        }
        this.raw = raw;
      } catch(e){
        console.log('Error compressing raw', e);
      }
    },
    async ensureOwnerExists(){
      const exists = await UserModel.countDocuments({
        uri: this.raw.user.uri
      });
      if(!exists){
        const user = new UserModel({raw: this.raw.user});
        await user.addCredit({ video: this.uri })
        await user.addWebsitesAsSearchResults()
      }
      this.raw.user = this.raw.user.uri;
      await this.save();
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
  },
  statics: {
    async fixUncompressedRaw(){
      const items = await this.find({ "raw.uri": { $exists: true }}).limit(1000);
      console.log('Fixing uncompressed raw', items.length);
      for(const item of items){
        try{
          if(item && item.compressRaw){
            await item.compressRaw();
            await item.save();
            console.log('did', item._id);
          }
        }catch(e){
          console.error('Error compressing raw video', item, e);
        }
      }
    }
  }
});
