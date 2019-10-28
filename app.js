

const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config');
const middleware = require('./utils/middleware');
//const personsRouter = require('./controllers/persons');
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})



console.log('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });


app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'));

app.use(middleware.requestLogger);


//app.use('/api/persons',personsRouter);

personsRouter.use(middleware.unknownEndpoint);
personsRouter.use(middleware.errorHandler);

module.exports = app;
