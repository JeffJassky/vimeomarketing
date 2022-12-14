const baseModel = require('./base.model');
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
const urlRegex = /\bhttps?:\/\/\S+/gi;
const siteTypes = {
  Behance: 'behance.net',
  Instagram: 'instagram.com',
  Facebook: 'facebook.com',
  Dribbble: 'dribbble.com',
  Twitter: 'twitter.com',
  Tumblr: 'tumblr.com',
  LinkedIn: 'linkedin.com'
}

const roleTypes = [
  {
    name: 'colorist',
    query: ['colorist', 'colourist', 'color','grading'],
  },
  {
    name: 'editor',
    query: ['editor','edit']
  },
  {
    name: 'editor',
    query: ['dp', 'dop', 'director of photography']
  },
  {
    name: 'cinematographer',
    query: ['cinematographer','cinematography']
  },
  {
    name: 'camera',
    query: ['camera','ac']
  },
  {
    name: 'director',
    query: ['director','direction','creator','created','ad']
  },
  {
    name: 'producer',
    query: ['producer','production company']
  },
  {
    name: 'sound',
    query: ['sound','audio','record','music','sfx']
  },
  {
    name: 'actor',
    query: ['actor','actress','acting']
  },
  {
    name: 'writer',
    query: ['writer','write']
  },
  {
    name: 'storyboarder',
    query: ['storyboard','story board']
  },
  {
    name: 'animator',
    query: ['animation','animator']
  },
  {
    name: 'vfx',
    query: ['motion','vfx','cgi','cg']
  },
  {
    name: 'light',
    query: ['gaffer','light']
  }
];

module.exports = baseModel({
  name: 'User',
  data:{
    uri: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    credits: {
      type: Object,
      default: []
    },
    raw: {
      type: Object,
      required: true
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    link: {
      type: String
    },
    location: {
      type: String
    },
    gender: {
      type: String
    },
    bio: {
      type: String
    },
    shortBio: {
      type: String
    },
    websites: {
      type: Object
    }
  },
  validate(next){
    if(this.isNew){
        this.compressRaw();
    }
    next();
  },
  async onCreate(){
    console.log('Added user', this.name, this._id);
  },
  computed: {
    emailAddresses(){
      const emails = new Set();
      if(this.bio){
        (this.bio.match(emailRegex) || []).forEach(email => emails.add(email))
      }
      if(this.short_bio){
        (this.short_bio.match(emailRegex) || []).forEach(email => emails.add(email))
      }
      if(emails.size > 0){
        return Array.from(emails);
      }else{
        return [];
      }
    },
    allWebsites(){
      let foundUrls = [];
      let allWebsites = [...this.websites];
      if(this.bio){
        (this.bio.match(urlRegex) || []).forEach(site => foundUrls.push(site))
      }
      if(this.short_bio){
        (this.short_bio.match(urlRegex) || []).forEach(site => foundUrls.push(site))
      }
      if(foundUrls.length > 0){
        foundUrls.forEach(foundUrl => {
          let exists = false;
          if(allWebsites.length > 0){
            // See if it already exists in the websites array
            if(allWebsites.find(website => website.link == foundUrl)){
              exists = true;
            }
          }
          if(!exists){
            const site = {
              uri: null,
              name: null,
              type: 'link',
              link: foundUrl,
              description: null
            };
            for(const siteTypeName in siteTypes){
              if(foundUrl.indexOf(siteTypes[siteTypeName]) !== -1){
                site.type = siteTypeName;
              }
            }
            allWebsites.push(site)
          }
        })
      }
      return allWebsites;
    },
    roles(){
      const roles = new Set();
      let searchStrings = [];
      if(this.bio){
        searchStrings.push(this.bio)
      }
      if(this.short_bio){
        searchStrings.push(this.short_bio)
      }
      if(this.credits){
        Array.prototype.push.apply(searchStrings, this.credits.map(credit => credit.role || ''));
      }
      const searchString = ` ${searchStrings.join(' ')} `;
      const foundRoles = roleTypes.filter(roleType => roleType.query.find(query => searchString.includes(` ${query} `)));

      return foundRoles.length > 0 ? foundRoles.map(role => role.name) : ['unknown'];
    },
    videos(){
      return this.credits.map(credit => credit.video)
    }
  },
  methods: {
    async compressRaw(){
      if(this.raw && this.raw.uri) {
        this.uri = this.raw.uri;
        this.name = this.raw.name;
        this.link = this.raw.link;
        this.location = this.raw.location;
        this.gender = this.raw.gender;
        this.bio = this.raw.bio;
        this.shortBio = this.raw.short_bio;
        this.websites = this.raw.websites;
        this.description = this.raw.description;
        try {
          const raw = {
            websites: this.raw.websites,
            location_details: this.raw.location_details,
            skills: this.raw.skills,
            picture: this.raw.pictures.sizes[this.raw.pictures.sizes.length-1].link
          }
          this.raw = raw;
        } catch (e) {
          console.error('Failed to reduce raw video content', e);
        }
      }
    },
    async addCredit(newCredit){
      const existingCreditIndex = this.credits.findIndex(credit => credit.video === newCredit.video);
      if(existingCreditIndex !== -1){
        // Update the existing credit
        this.credits[existingCreditIndex].role = this.credits[existingCreditIndex].role || newCredit.role;
        this.credits[existingCreditIndex].name = this.credits[existingCreditIndex].role || newCredit.name;
      }else{
        // Add the new credit
        this.credits.push(newCredit);
      }
      await this.save();
    }
  },
  statics: {
      async fixUncompressedRaw(){
          const users = await this.find({ "raw.uri": { $exists: true }});
          for(const user of users){
            try{
              if(user && user.compressRaw){
                await user.compressRaw();
                await this.save();
                console.log('did', user._id);
              }
            }catch(e){
              console.error('Error compressing raw user', user, e);
            }
          }
      }
  }
});
