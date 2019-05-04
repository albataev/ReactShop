import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCatalogItem, setEditItemData } from '../../actions/shopActions';
import SelectListGroup from '../common/SelectListGroup';


// edit page
class DashboardCatalog extends Component {
  state = {
      sortParam: 'price',
      sortedCatalogParam: [],
      sortedCatalog: []
  };

  onDeleteClick = (id) => {
      console.log('[DashboardCatalog] onDeleteClick clicked', id);
      this.props.deleteCatalogItem(id);
  };

  onEditClick = (item) => {
      this.props.setEditItemData(item);
      this.props.history.push('/edit-item');
      console.log('[DashboardCatalog] onEditClick clicked', item);
  };

  onSelectSortParam = (e) => {
      this.setState({ [e.target.name]: e.target.value });
  };

  onChange = (e) => {
      this.setState({ sortParam: e.target.value });
  };

  sortCatalog = () => {
      // this.setState({ sortParam: e.target.value });
      let sortedCatalogParamArray = this.props.shop.catalog.map(item => (item[this.state.sortParam])
      );
      if (this.state.sortParam === 'price') {
          sortedCatalogParamArray = [...sortedCatalogParamArray].sort((a, b) => (a - b));
      } else {
          sortedCatalogParamArray = [...sortedCatalogParamArray].sort();
      }
      console.log('=====> sorted param list: ', sortedCatalogParamArray);
      const sortedCatalog = [];
      const processedIdsList = [];
      console.log('++++++++ sortedCatalog before filling: ', sortedCatalog);
      sortedCatalogParamArray.map(sortParamValue => {
          this.props.shop.catalog.forEach((catalogItem) => {
              if (catalogItem[this.state.sortParam] === sortParamValue && processedIdsList.indexOf(catalogItem._id) === -1) {
                  sortedCatalog.push(catalogItem);
                  // add item Id to list to avoid adding multiple times same items if they have identical params, e.g. same price
                  processedIdsList.push(catalogItem._id);
              }
          });
          return undefined;
      });
      console.log('=====> sorted catalog: ', sortedCatalog);
      return sortedCatalog;
  };

  render() {
      const generateKey = (pre) => (`${pre}_${new Date().getTime()}`);
      const engToRusCatTitlesMap = {};
      let dashboardCatalogItems = [];
      let sortedCatalogParamArray = [];
      // const sortedCatalog = [];
      const options = [
          { label: 'Название', value: 'title' },
          { label: 'Цена', value: 'price' }
      ];
      const { categories, catalog } = this.props.shop;

      if (!this.props.shop.categoriesLoading && !this.props.shop.catalogLoading) {
          console.log('[DashboardCatalog] FIRED', this.props.shop);
          for (let i = 0; i < Object.keys(categories).length; i += 1) {
              engToRusCatTitlesMap[categories[i].title] = categories[i].russtitle;
          }
          // create list of sorted catalog item fields to iterate over and create sorted catalog by this field
          sortedCatalogParamArray = catalog.map(item => (
              item[this.state.sortParam])
          ).sort();
          // create catalog array sorted by selected catalog item field
          const sortedCatalog = this.sortCatalog(sortedCatalogParamArray);

          dashboardCatalogItems = sortedCatalog.map(item => (
              <tr key={generateKey(item._id)}>
                  <td>{engToRusCatTitlesMap[item.category]}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>
                      <button
                          className="btn btn-danger small"
                          type="button"
                          onClick={() => this.onDeleteClick(item._id)}
                      >
                        Удалить
                      </button>
                  </td>
                  <td>
                      <button
                          className="btn btn-danger small"
                          type="button"
                          // href={"/edit-item"}
                          onClick={() => this.onEditClick(item)}
                      >
                        Изменить
                      </button>
                  </td>
              </tr>
          ));
      }

      return (
          <div className="experience">
              <h4>Товары:</h4>
              <SelectListGroup
                  name="category"
                  onChange={this.onChange}
                  placeholder="Сортировка"
                  value={this.state.sortParam}
                  options={options}
                  info="Выбрать сортировку"
              />
              <table className="table">
                  <thead />
                  <tbody>
                      <tr>
                          <th>Категория</th>
                          <th>Название</th>
                          <th>Цена</th>
                          <th>Описание</th>
                      </tr>
                      {dashboardCatalogItems}
                  </tbody>
              </table>
          </div>
      );
  }
}

DashboardCatalog.propTypes = {
    deleteCatalogItem: PropTypes.func.isRequired,
    // history: PropTypes.object.isRequired,
    setEditItemData: PropTypes.func.isRequired,
    shop: PropTypes.object.isRequired,
    catalog: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    shop: state.shop
});

export default connect(mapStateToProps, { deleteCatalogItem, setEditItemData })(withRouter(DashboardCatalog));
