import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import DashboardActions from './DashboardActions';
import CatalogItemsDashboard from './DashboardCatalog';
import { getCatalog, getCategories } from '../../actions/shopActions';

class Dashboard extends Component {
  componentDidMount() {
    console.log('[Dashboard] componentDidMount fired');
    this.props.getCatalog();
    this.props.getCategories();
  }

  render() {
    // const { user } = this.props.auth;
    const { catalog, loading } = this.props.shop;
    // console.log('=======DASHBOARD this.props.shop ', this.props.shop);
    let dashboardContent;

    if ((catalog === null) || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if user has a profile data
      dashboardContent = (
        <div>
          <DashboardActions />
          <CatalogItemsDashboard catalog={catalog} />
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Панель управления</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCatalog: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  shop: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  shop: state.shop
});

export default connect(mapStateToProps, { getCatalog, getCategories })(Dashboard);
