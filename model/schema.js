const mongoose = require('mongoose')

const { Schema } = mongoose

const schema = new Schema({
  id: String,
  name: String,
  points: Number,
  maxpoints: Number,
})

module.exports = mongoose.model('Player', schema)
