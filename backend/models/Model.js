const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: Date
});

module.exports = mongoose.model('News', newsSchema);