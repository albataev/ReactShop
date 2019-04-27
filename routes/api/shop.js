const express = require('express');
const router = express.Router();
const passport = require('passport');
const Catalog = require('../../models/Catalog');
const Category = require('../../models/Category');
const validateCatalogItemInput = require('../../validation/validateCatalogItem');
const validateCategoryItemInput = require('../../validation/validateCategoryItem');


// @route   GET api/shop/catalog
// @desc    Get all items in catalog
// @access  Public
// @return {array} array of objects representing items in catalog
// object fields:
// title: String
// category: String
// price: Number
// current: Boolean
// image: String
// longtitle: String
// externalurl: String
// description: String

router.get('/catalog',
  (req, res) => {
    const errors = {};
    Catalog.find()
      .then(catalog => {
        // console.log(catalog);
        if (!catalog) {
          errors.nocatalog = 'FIND error';
          return res.status(404).json(errors);
        }
        // console.log(catalog);
        return res.json(catalog);
      })
      .catch((err) => res.status(404).json({ nocatalog: 'Catch error', message: err.message }));
  });


// @route   GET api/shop/catalog/:item_id
// @desc    Get item with particular id
// @access  Public
// @return {object} object representing item
// object fields:
// title: String
// category: String
// price: Number
// current: Boolean
// image: String
// longtitle: String
// externalurl: String
// description: String

router.get('/catalog/:item_id',
  (req, res) => {
    const errors = {};
    Catalog.find({ _id: req.params.item_id })
      .then(catalogItem => {
        // console.log(catalogItem);
        if (!catalogItem) {
          errors.nocatalog = 'FIND error';
          return res.status(404).json(errors);
        }
        console.log(catalogItem);
        return res.json(catalogItem);
      })
      .catch((err) => res.status(404).json({ nocatalogitem: 'Catch error', message: err.message }));
  });

// @route   GET api/shop/categories/
// @desc    Get all categories
// @access  Public
// @return {object} array of objects representing categories
// object fields:
//  title: String
//  russtitle: String
//  url: String
//  description: String
//  image: String
//  parent: String
//  level: String

router.get('/categories',
  (req, res) => {
    const errors = {};
    Category.find()
      .then(category => {
        // console.log(category);
        if (!category) {
          errors.nocatalog = 'FIND error';
          return res.status(404).json(errors);
        }
        // console.log(categories);
        return res.json(category);
      })
      .catch((err) => res.status(404).json({ nocategory: 'Catch error', message: err.message }));
  });


// @route   GET api/shop/categories/:category_id
// @desc    Get category with particular id
// @access  Public
// @return {object} object representing category
// object fields:
//  title: String
//  russtitle: String
//  url: String
//  description: String
//  image: String
//  parent: String
//  level: String

router.get('/categories/:category_id',
  (req, res) => {
    const errors = {};
    Category.find({ _id: req.params.category_id })
      .then(categoryItem => {
        // console.log(categoryItem);
        if (!categoryItem) {
          errors.nocategoryitem = 'FIND error';
          return res.status(404).json(errors);
        }
        // console.log(categoryItem);
        return res.json(categoryItem);
      })
      .catch((err) => res.status(404).json({ nocategoryitem: 'Catch error', message: err.message }));
  });


// @route   POST api/shop/catalog
// @desc    Add item to catalog
// @access  Private
// Gets the {object} representing item
// object fields:
// title: String
// longtitle: String
// category: String
// price: Number
// current: Boolean
// image: String
// externalurl: String
// description: String


router.post('/catalog',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCatalogItemInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newItem = {
      title: req.body.title,
      longtitle: req.body.longtitle,
      category: req.body.category,
      price: req.body.price.split(' ').join(''),
      current: req.body.current,
      image: req.body.image,
      externalurl: req.body.externalurl,
      description: req.body.description
    };
    const catalogItem = new Catalog(newItem);
    catalogItem.save()
      .then(() => {
        console.log("Item added: ", catalogItem);
        res.json(catalogItem);
      })
      .catch(err => res.status(404).json({ catalogitemsaveerror: 'catalogItem save error', message: err }));
  });

// @route   POST api/shop/category
// @desc    Add category or several categories to categories
// Gets the {array of objects} representing categories
// object fields:
//  title: String
//  russtitle: String
//  url: String
//  description: String
//  image: String
//  parent: String
//  level: String
// @access  Private


router.post('/category',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCategoryItemInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newItem = {
      title: req.body.title,
      russtitle: req.body.russtitle,
      url: req.body.url,
      description: req.body.description,
      image: req.body.image,
      parent: req.body.parent,
      level: req.body.level
    };
    const categoryItem = new Category(newItem);
    categoryItem.save()
      .then(res.json(categoryItem))
      .catch(err => res.status(404).json({ catalogitemsaveerror: 'catalogItem save error', message: err }));
  });

// @route   POST api/shop/catalog/:item_id
// @desc    Edit item with particular id
// @access  Private
// @return {object} object representing item
// object fields:
// title: String
// category: String
// price: Number
// current: Boolean
// image: String
// longtitle: String
// externalurl: String
// description: String
// =========================EDIT=====================
router.post('/catalog/:itemId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('EDIT ITEM DATA: ', req.body);
    const { errors, isValid } = validateCatalogItemInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const itemData = { ...req.body };
    delete itemData._id;
    Catalog.findOneAndUpdate(
      { _id: req.params.itemId },
      { $set: itemData },
      { new: true })
      .then(item => {
        if (item) {
          console.log('UPDATED CATALOG ITEM: ', item);
          res.json(item);
        } else {
          console.log('[POST api/shop/catalog/:itemId] EDIT ITEM ERROR. Db response: ', item);
          console.log('DATA RECEIVED: ', req.body, itemData);
          console.log('ITEM ID: ', req.params.itemId);
          res.status(404).json({ errorupdateitem: `item with id ${req.params.itemId} not found` });
        }
      })
      .catch((err) => res.status(404).json({ errorupdatingitem: 'Catch error', message: err.message }));
  });

// @route   DELETE api/shop/catalog/:item_id
// @desc    DELETE catalog item with particular id
// @access  Private

router.delete(
  '/catalog/:item_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('DELETE api/shop/catalog/:item_id fired: ', req.params.item_id);
    Catalog.deleteOne({ _id:  req.params.item_id})
      .then(result => {
        console.log(result.deletedCount);
        if (result.deletedCount > 0) {
          res.status(200).json({ deletecount: result.deletedCount });
        } else {
          res.status(200).json({ deleteerror: `No item found with this id: ${req.params.item_id}` });
        }
      })
      .catch(err=> {
        console.log(err);
        res.status(404).json({ catalogitemdeleteerror: 'catalogItemDelete error', message: err });
      });
  });

// @route   DELETE api/shop/catalog/:item_id
// @desc    DELETE catalog item with particular id
// @access  Private

router.delete(
  '/category/:category_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('DELETE api/shop/category/:item_id fired: ', req.params.category_id);
    Category.deleteOne({ _id:  req.params.category_id})
      .then(result => {
        console.log(result.deletedCount);
        if (result.deletedCount > 0) {
          res.status(200).json({ deletecount: result.deletedCount });
        } else {
          res.status(200).json({ deleteerror: `No category found with this id: ${req.params.category_id}` });
        }
      })
      .catch(err=> {
        console.log(err);
        res.status(404).json({ categoryitemdeleteerror: 'categoryItemDelete error', message: err });
      });
  });

module.exports = router;
