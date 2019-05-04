import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../validation/is-empty';

// main page display catalog
class CatalogItems extends Component {
  state = {
    // items: [],
    // currentCatTitle: 'Все товары'
  };

  componentDidMount() {
    // this.props.getCategories();
    // this.setState({ items: [...this.props.shop.catalog] });
  }

  onCategoryClick = (engCatTitle, rusCatTitle) => {
    console.log('onCategoryClick!!!', engCatTitle);
    const filteredItems = this.props.shop.catalog.filter((item) => item.category === engCatTitle);
    this.setState({ items: filteredItems, currentCatTitle: rusCatTitle });
  };

  render() {
    const options = {};
    const { categories } = this.props.shop;
    let categoriesLinks = [];
    if (!this.props.shop.categoriesLoading) {
      console.log('[CatalogPage] categories: ', categories);
      for (let i = 0; i < Object.keys(categories).length; i += 1) {
        options[categories[i].title] = categories[i].russtitle;
      }
      categoriesLinks = categories.map((item) => (
        <li
          className="cat-item"
          key={item._id}
        >
          <a
            onClick={() => this.onCategoryClick(item.title, item.russtitle)}
          >
            {item.russtitle}
          </a>
        </li>
      ));
    }
    return (
      <div id="sidebar" className="sidebar">
        <aside id="electro_product_categories_widget-2" className="widget widget_product_categories">
          <ul className="product-categories category-single">
            <li>
              <ul className="children product_cat">
                {categoriesLinks}
              </ul>
            </li>
          </ul>
        </aside>
      </div>
    );
  }
}

CatalogItems.propTypes = {
  shop: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  shop: state.shop
});

export default connect(mapStateToProps)(CatalogItems);
