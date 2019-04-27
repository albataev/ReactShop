import {
  GET_CATEGORIES,
  GET_CATALOG,
  SET_CURRENT_CATEGORY,
  SET_CURRENT_ITEM,
  CATALOG_LOADING,
  CATEGORIES_LOADING,
  EDIT_ITEM
}
  from '../actions/types';

const initialState = {
  categories: [],
  catalog: [],
  categoriesLoading: false,
  catalogLoading: false,
  editItemData: '',
  currentCategory: 'all',
  currentItem: null
};

export default function (state = initialState, action) {
  switch (action.type) {
  case CATEGORIES_LOADING:
    console.log('[shopReducer CATEGORIES_LOADING fired]');
    return {
      ...state,
      categoriesLoading: true
    };
  case EDIT_ITEM:
    console.log('[shopReducer CATEGORIES_LOADING fired]');
    return {
      ...state,
      editItemData: action.payload
    };
  case SET_CURRENT_CATEGORY:
    console.log('[shopReducer SET_CURRENT_CATEGORY fired]');
    return {
      ...state,
      currentCategory: action.payload
    };
  case SET_CURRENT_ITEM:
    console.log('[shopReducer SET_CURRENT_ITEM fired]');
    return {
      ...state,
      currentItem: action.payload
    };
  case CATALOG_LOADING:
    console.log('[shopReducer CATALOG_LOADING fired]');
    return {
      ...state,
      catalogLoading: true
    };
  case GET_CATALOG:
    console.log('[shopReducer GET_CATALOG fired]');
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
    return {
      ...state,
      catalog: action.payload,
      catalogLoading: false
    };
  case GET_CATEGORIES:
    console.log('[shopReducer GET_CATEGORIES fired]');
    // @return {array} array of objects representing categories
    // object fields:
    //  title: String
    //  russtitle: String
    //  url: String
    //  description: String
    //  image: String
    //  parent: String
    //  level: String
    return {
      ...state,
      categories: action.payload,
      categoriesLoading: false
    };
  default:
    return state;
  }
}
