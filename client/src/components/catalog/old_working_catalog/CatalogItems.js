import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import SingleItem from './SingleItem';
import getSlug from 'speakingurl';

// main page display catalog
class CatalogItems extends Component {
  state = {
    items: [],
    currentCatTitle: 'Все товары',
    item: null,
    validCategory: true
  };

  componentDidMount() {
    console.log("&&&&&&&&&CATALOGITEMS PATH: ", this.props.location.pathname);
    // this.props.getCategories();
    const catNameFromUrl = this.props.location.pathname.split('/');
    console.log("&&&&&&&&&CATALOGITEMS catNameFromUrl: ", catNameFromUrl[1]);
    let itemNameFromUrl = null;
    if (catNameFromUrl.length > 2) {
      itemNameFromUrl = catNameFromUrl[2];
      console.log("&&&&&&&&&CATALOGITEMS itemNameFromUrl: ", itemNameFromUrl);
    }
    if ((this.props.shop.currentCategory === 'all') && (this.props.location.pathname === '/')) {
      this.setState({ items: [...this.props.shop.catalog] });
    } else {
      const category = this.props.shop.categories.filter((category) => category.title === catNameFromUrl[1]);
      console.log("&&&&&&&&&CATALOGITEMS CATEGORY: ", category);
      // const category = this.props.shop.categories.filter((category) => category.title === this.props.shop.currentCategory);
      if (category.length > 0) {
        const filteredItems = this.props.shop.catalog.filter((item) => item.category === category[0].title);
        this.setState({ items: filteredItems, item: null });
      } else {
        this.setState({ validCategory: false });
      }
    }
  }

  onCategoryClick = (categoryId) => {
    // get category object
    const category = this.props.shop.categories.filter((category) => category._id === categoryId);
    console.log('onCategoryClick!!!', categoryId, category[0]);
    const filteredItems = this.props.shop.catalog.filter((item) => item.category === category[0].title);
    this.setState({ items: filteredItems, currentCatTitle: category[0].russtitle, item: null });
    window.history.pushState({},"", '/' + category[0].title);
  };

  // при клике на товар задается в state значение
  onItemClick = (itemId, russItemTitle, item) => {
    console.log('onItemClick!!!', item);
    // const filteredItems = this.props.shop.catalog.filter((item) => item.category === engCatTitle);
    this.setState({ currentCatTitle: russItemTitle, item });
    const catSlug = getSlug(item.category, { lang: 'ru' });
    const itemSlug = getSlug(item.title, { lang: 'ru' });
    const url = '/' + catSlug + '/' + itemSlug;
    window.history.pushState({},"", url);
  };

  render() {
    const options = {};
    const { categories } = this.props.shop;
    let categoriesLinks = [];
    let catalogItems = [];
    console.log('[CatalogItems] categories: ', categories);
    for (let i = 0; i < Object.keys(categories).length; i += 1) {
      options[categories[i].title] = categories[i].russtitle;
    }
    categoriesLinks = categories.map((category) => (
      <li className="cat-item" key={category._id}>
        <a href="#top-page" onClick={() => this.onCategoryClick(category._id)}>
          {category.russtitle}
        </a>
      </li>
    ));
    if (this.state.validCategory) {
      catalogItems = this.state.items.map(item => (
        <li className="product " key={item._id}>
          <div className="product-outer" style={{height: '450px'}}>
            <div className="product-inner">
              <span className="loop-product-categories">
                <a rel="tag">{options[item.category]}</a>
              </span>
              <a href="#top-page" onClick={() => this.onItemClick(item._id, item.title, item)}>
                <h3>{item.title}</h3>
                <div className="product-thumbnail">
                  <img src={item.image} alt=""/>
                </div>
              </a>
              <div className="price-add-to-cart">
                <span className="price">
                  <span className="electro-price">
                    <span className="amount">&#8381;&nbsp;{item.price}</span>
                  </span>
                </span>
              </div>
              <div>
                {isEmpty(item.description)
                  ? (
                    <span>
                      <strong>Описание: </strong>не указано
                    </span>
                  )
                  : (
                    <span>
                      <strong>Описание: </strong>
                      {(item.description.length > 50)
                        ? `${item.description.slice(0, 50)}...`
                        : item.description
                      }
                    </span>
                  )
                }
              </div>
            </div>
          </div>
        </li>
      ));
    } else {
      catalogItems = <h1>Category not Found</h1>;
    }
    return (
      <div>
        <div id="primary" className="content-area">
          <main id="main" className="site-main">
            <section>
              {this.state.item === null
                ? (
                  <div>
                    <header>
                      <a name="top-page">
                        <h2 className="h1">{this.state.currentCatTitle}</h2>
                      </a>
                    </header>
                    <div className="tab-content">
                      <div role="tabpanel" className="tab-pane active" id="grid" aria-expanded="true">
                        <ul className="products columns-3">
                          {catalogItems}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
                : (
                  <SingleItem
                    item={this.state.item}
                    rusCategory={options[this.state.item.category]}
                    history={this.props.history}
                  />
                )
              }
            </section>
          </main>
        </div>
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
      </div>
    );
  }
}

CatalogItems.propTypes = {
  shop: PropTypes.object.isRequired,
  history: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  shop: state.shop
});

export default connect(mapStateToProps)(withRouter(CatalogItems));
