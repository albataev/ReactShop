const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const CatalogSchema = new Schema({
    categoryname: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    current: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    },
    longtitle: {
        type: String
    },
    externalurl: {
        type: String
    },
    description: {
        type: String
    }
});

const Catalog = mongoose.model('catalog', CatalogSchema);

module.exports = Catalog;
