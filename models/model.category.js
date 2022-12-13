const baseModel = require('./base.model');
const VideoModel = require('../models/model.video');
const vimeo = require('../services/vimeo');

module.exports = baseModel({
  name: 'Category',
  data:{
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    currentPage: {
      type: Number,
      required: true,
      default: 0
    },
    total: {
      type: Number,
      required: true,
      default: 0
    },
    perPage: {
      type: Number,
      required: true,
      default: 25
    },
    lastPage: {
      type: Number
    },
    hasNextPage:{
      type: Boolean,
      default: true
    },
    lastChecked: {
      type: Date
    }
  },
  async validate(next){
    if(this.isNew){
      const videos = await this.loadNextPage();
      if(!videos){
        // No videos found in this category
        return next(false);
      }
    }
    next();
  },
  computed: {
    nextPage(){
      return this.currentPage + 1;
    }
  },
  methods: {
    async loadNextPage() {
      try {
        const videos = await vimeo.request(`/categories/${this.name}/videos?page=${this.nextPage}&per_page=${this.perPage}`);
        for (const video of videos.data) {
          const existingVideo = await VideoModel.findOne({
            uri: video.uri
          });
          if (!existingVideo) {
            const newVideo = new VideoModel({
              raw: video,
              foundOnCategory: this.name
            });
            await newVideo.save();
          } else {
            if (!existingVideo.foundOnCategory) {
              existingVideo.foundOnCategory = this.name;
              await existingVideo.save();
            }
            console.log('Video already exists in system', existingVideo.uri);
          }
        }
        if (videos){
          if(this.perPage == 100){
            this.perPage = 50;
            this.currentPage = Math.floor(this.nextPage * 2)
          }else{
            this.perPage = videos.per_page;
          }
          this.total = videos.total;
          this.lastPage = Math.ceil(this.total / this.perPage);
          this.currentPage = this.nextPage;
          this.hasNextPage = this.currentPage < this.lastPage;
          this.lastChecked = new Date();
          return {
            name: this.name,
            videos: videos.data,
            total: this.total,
            perPage: this.perPage,
            currentPage: this.currentPage,
            nextPage: this.nextPage,
            pagesRemaining: this.lastPage - this.currentPage,
          };
        }
      } catch (e) {
        console.log(`Error loading category ${this.name} page ${this.nextPage}`, e);
      }
    }
  }
});
