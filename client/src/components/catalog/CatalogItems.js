/* eslint-disable react/forbid-prop-types,jsx-a11y/anchor-is-valid,react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import getSlug from 'speakingurl';
import isEmpty from '../../validation/is-empty';
import SingleItem from './SingleItem';
import { setCurrentItem } from '../../actions/shopActions';

// main page display catalog
class CatalogItems extends Component {
  render() {
    console.log('===+++===+++[CatalogItems] rendering categoryName: ', this.props.categoryName);
    console.log('===+++===+++[CatalogItems] this.props.selectedItem: ', this.props.selectedItem);
    console.log('===+++===+++[CatalogItems ] this.props.shop.catalog: ', this.props.shop.catalog);
    // filter items by category name
    let filteredItemsRendered = this.props.shop.catalog.filter((item) => item.category === this.props.categoryName);
    if (this.props.categoryName === 'all') {
      filteredItemsRendered = this.props.shop.catalog;
    }
    const { categories } = this.props.shop;
    let rusCategoryName;
    let catalogItemsData = [];
    const { engToRusCatTitlesMap } = this.props;

    const categoriesLinks = categories.map((category) => (
      <li className="cat-item" key={category._id}>
        <Link
          to={{ pathname: `/tovary/${category.title}` }}
        >
          {category.russtitle}
        </Link>
      </li>
    ));

    if (this.props.categoryName === 'all') {
      rusCategoryName = 'Все товары';
    } else {
      rusCategoryName = engToRusCatTitlesMap[this.props.categoryName];
    }

    if (this.props.validCategoryProvided) {
      console.log('===+++===+++[CatalogItems] validCategory found: ', this.props.categoryName);
      if (!this.props.validItemProvided) {
        catalogItemsData = <h2>Товар не найден</h2>;
      } else {
        catalogItemsData = filteredItemsRendered.map(item => (
          <li className="product " key={item._id}>
            <div className="product-outer" style={{ height: '450px' }}>
              <div className="product-inner">
                <span className="loop-product-categories">
                  <a rel="tag">{engToRusCatTitlesMap[item.category]}</a>
                </span>
                <Link
                  to={
                    { pathname: `/tovary/${getSlug(item.category, { lang: 'ru' })}/${getSlug(item.title, { lang: 'ru' })}` }
                  }
                >
                  <h3>{item.title}</h3>
                  <div className="product-thumbnail">
                    <img src={item.image} alt="" />
                  </div>
                </Link>
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
      }
    } else {
      catalogItemsData = <h1>Категория товара не найдена</h1>;
    }

    return (
      <div>
        <div id="primary" className="content-area">
          <main id="main" className="site-main">
            <section>
              {this.props.selectedItem === null
                ? (
                  <div>
                    <header>
                      <a name="top-page">
                        <h2 className="h1">{rusCategoryName}</h2>
                      </a>
                    </header>
                    <div className="tab-content">
                      <div role="tabpanel" className="tab-pane active" id="grid" aria-expanded="true">
                        <ul className="products columns-3">
                          {catalogItemsData}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
                : (
                  <SingleItem
                    selectedItem={this.props.selectedItem}
                    rusCategory={engToRusCatTitlesMap[this.props.selectedItem.category]}
                    history={this.props.history}
                    setCurrentItem={this.props.setCurrentItem}
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
  selectedItem: PropTypes.object.isRequired,
  validCategoryProvided: PropTypes.bool.isRequired,
  validItemProvided: PropTypes.bool.isRequired,
  engToRusCatTitlesMap: PropTypes.objectOf(PropTypes.string).isRequired,
  categoryName: PropTypes.string.isRequired,
  history: PropTypes.func.isRequired,
  setCurrentItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  shop: state.shop
});

export default connect(mapStateToProps, { setCurrentItem })(withRouter(CatalogItems));
