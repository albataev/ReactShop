const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  russtitle: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  parent: {
    type: String
  },
  level: {
    type: String
  }
});

const Category = mongoose.model('categories', CategoriesSchema);

module.exports = Category;
