require('dotenv').config();
require('./database');
const mailchimp = require('@mailchimp/mailchimp_marketing');
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us12',
});

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);``

const ChannelsController = require('./controllers/channels');
const CategoriesController = require('./controllers/categories');
const VideosController = require('./controllers/videos');
const UsersController = require('./controllers/users');
const CoreController = require('./controllers/core');

const express = require('express')
const app = express()
const port = 80;

app.use(express.urlencoded());
app.use(express.json());
app.use(express.raw());

app.use((req, res, next) => {
  console.log(
    new Date().toString().split('GMT')[0],
    req.path,
    req.ip
  );
  next();
});

app.get('/channels/:channelName/add', ChannelsController.create)
app.get('/channels/:channelName/loadNextPage', ChannelsController.loadNextPage)
app.get('/categories/:categoryName/add', CategoriesController.create)
app.get('/categories/:categoryName/loadNextPage', CategoriesController.loadNextPage)
app.get('/emails', UsersController.findEmails)
app.get('/websites', UsersController.findWebsites)
app.get('/credits', VideosController.getCredits)
app.get('/searchResults', CoreController.index("SearchResult"))

const agendash = require('agendash');
const agenda = require('./queue');
app.use('/queue', agendash(agenda))



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


