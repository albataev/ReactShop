import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CatalogItems from './CatalogItems';
import Spinner from '../common/Spinner';
import { getCatalog, getCategories } from '../../actions/shopActions';

class Catalog extends Component {
  state = {
    items: [],
    currentCatTitle: 'Все товары',
    item: null,
    validCategory: true
  };

  componentDidMount() {
    console.log("--------> [Catalog.js] CATALOG PATH: ", this.props.location.pathname);
    this.props.getCatalog();
    this.props.getCategories();
  }

  onCategoryClick = (categoryId) => {
    // get category object
    const category = this.props.shop.categories.filter((category) => category._id === categoryId);
    console.log('onCategoryClick!!!', categoryId, category[0]);
    const filteredItems = this.props.shop.catalog.filter((item) => item.category === category[0].title);
    this.setState({ items: filteredItems, currentCatTitle: category[0].russtitle, item: null });
    window.history.pushState({},"", '/' + category[0].title);
  };

  render() {
    const { catalog, catalogLoading, categoriesLoading } = this.props.shop;
    let catalogContent;
    if (catalog === null || catalogLoading || categoriesLoading) {
      catalogContent = <Spinner />;
    } else {
      catalogContent = (
        <div>
          <div className="container">
            <CatalogItems />
          </div>
        </div>
      );
    }
    return (
      <div>
        {catalogContent}
      </div>
    );
  }
}

Catalog.propTypes = {
  shop: PropTypes.object.isRequired,
  getCatalog: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  shop: state.shop,
  auth: state.auth
});

export default connect(mapStateToProps, { getCatalog, getCategories })(Catalog);
