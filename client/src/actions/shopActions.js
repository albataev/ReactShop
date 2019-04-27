import axios from 'axios';

import {
  GET_ERRORS,
  GET_CATEGORIES,
  SET_CURRENT_CATEGORY,
  SET_CURRENT_ITEM,
  CLEAR_ERRORS,
  GET_CATALOG,
  CATEGORIES_LOADING,
  CATALOG_LOADING,
  EDIT_ITEM
}
  from './types';

const debug = true;

export const clearErrors = () => ({ type: CLEAR_ERRORS });
export const setEditItemData = (itemData) => ({ type: EDIT_ITEM, payload: itemData });
export const setCurrentCategory = (catName) => ({ type: SET_CURRENT_CATEGORY, payload: catName });

export const addItem = (itemData, history) => dispatch => {
  if (debug) {
    console.log('[shopActions addItem] FIRED');
  }
  dispatch(clearErrors());
  axios.post('/api/shop/catalog', itemData)
    .then(res => {
      if (debug) {
        console.log('[shopActions addItem] SUCCESS', res.data);
      }
      // implement page refresh
      history.push('/dashboard');
    })
    .catch(err => {
      console.log('[shopActions addItem] ERROR', err.response.data);
      console.log('[shopActions addItem] payload', itemData);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentItem = (itemData, history) => dispatch => {
  if (debug) {
    console.log('[shopActions setCurrentItem] FIRED');
  }
  dispatch({ type: SET_CURRENT_ITEM, payload: itemData });
};

// передать данные формы для редактирования элемента каталога
export const editItem = (itemId, itemData, history) => dispatch => {
  dispatch(clearErrors());
  if (debug) {
    console.log('[shopActions EditCatalogItem]');
    console.log('item_id: ', itemId);
    console.log('itemData: ', itemData);
  }
  axios.post(`/api/shop/catalog/${itemId}`, itemData)
    .then(res => {
      if (debug) {
        console.log('[shopActions EditCatalogItem] SUCCESS', res.data);
      }
      dispatch(setEditItemData({}));
      history.push('/dashboard');
      // fetch updated profile
      // dispatch({
      //   type: GET_CATALOG,
      //   payload: res.data
      // });
    })
    .catch(err => {
      console.log('[shopActions EditCatalogItem] ERROR', err.response);
      console.log('[shopActions EditCatalogItem] payload', itemData);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getCategories = () => dispatch => {
  if (debug) {
    console.log('[shopActions getCategories] FIRED');
  }
  dispatch({
    type: CATEGORIES_LOADING
  });
  axios.get('/api/shop/categories/')
    .then(res => {
      if (debug) {
        console.log('[shopActions getCategories] SUCCESS', res.data);
      }
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log('[shopActions getCategories] ERROR', err);
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    });
};

// get getCatalog items

export const getCatalog = () => dispatch => {
  if (debug) {
    console.log('[shopActions getCatalog] FIRED');
  }
  dispatch({
    type: CATALOG_LOADING
  });
  axios.get('/api/shop/catalog')
    .then(res => {
      if (debug) {
        console.log('[shopActions getCatalog] SUCCESS', res.data);
      }
      dispatch({
        type: GET_CATALOG,
        payload: res.data
      });
    })
    .catch(err => {
      console.log('[shopActions getCatalog] ERROR', err);
      // dispatch({
      //   type: GET_CATALOG,
      //   payload: {}
      // });
    });
};

// Add item to catalog
// @route   POST api/shop/catalog
// @desc    Add item or several items to catalog
// Gets the {array of objects} representing items
// object fields:
// title: String
// longtitle: String
// category: String
// price: Number
// current: Boolean
// image: String
// externalurl: String
// description: String


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

export const addCategory = (categoryData, history) => dispatch => {
  if (debug) {
    console.log('[shopActions addCategory] FIRED');
  }
  dispatch(clearErrors());
  axios.post('api/shop/category', categoryData)
    .then(res => {
      if (debug) {
        console.log('[shopActions addCategory] SUCCESS', res.data);
      }
      // implement page refresh
      history.push('/dashboard');
    })
    .catch(err => {
      console.log('[shopActions addCategory] ERROR', err.response.data);
      console.log('[shopActions addCategory] payload', categoryData);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// @route   DELETE api/shop/catalog/:item_id
// @desc    DELETE catalog item with particular id
// @access  Private

export const deleteCatalogItem = (id) => dispatch => {
  if (debug) {
    console.log('[shopActions deleteCatalogItem] FIRED');
  }
  axios.delete(`/api/shop/catalog/${id}`)
    .then(res => {
      if (debug) {
        console.log('[shopActions deleteCatalogItem] SUCCESS', res.data);
      }
      // fetch updated profile
      dispatch(getCatalog());
      console.log('[shopActions getCatalog after item delete]');
      // history.push('/dashboard');
      // dispatch({
      //   type: GET_CATALOG
      // payload: res.data
      // });
    })
    .catch(err => {
      console.log('[shopActions deleteCatalogItem] ERROR', err);
      console.log('[shopActions deleteCatalogItem] payload', id);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// @route   DELETE api/shop/category/:category_id
// @desc    DELETE category item with particular id
// @access  Private

export const deleteCategory = (id) => dispatch => {
  if (debug) {
    console.log('[shopActions deleteCategoryItem] FIRED');
  }
  axios.delete(`/api/shop/category/${id}`)
    .then(res => {
      if (debug) {
        console.log('[shopActions deleteCategoryItem] SUCCESS', res.data);
      }
      // fetch updated profile
      dispatch({
        type: GET_CATALOG,
        payload: res.data
      });
    })
    .catch(err => {
      console.log('[shopActions deleteCategoryItem] ERROR', err.response.data);
      console.log('[shopActions deleteCategoryItem] payload', id);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
