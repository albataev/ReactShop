import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
// import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
  state = {
    toggle: false
  };

  toggleMenu = () =>
    this.setState({ toggle: !this.state.toggle });

  onLogoutClick(e) {
    e.preventDefault();
    // this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { toggle } = this.state;

    const show = toggle ? 'show' : '';

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <span>
        <br/>
        <span>
          <Link to="/dashboard">
            Редактировать каталог
          </Link>
        </span><br/>
        <span>
          <a href="/" onClick={this.onLogoutClick.bind(this)}>
            Выйти
          </a>
        </span>
      </span>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Войти
          </Link>
        </li>
      </ul>
    );

    return (
      <header id="masthead" className="site-header header-v2" style={{ backgroundColor: '#fed700', marginBottom: '10px' }}>
        <div className="container">
          <div className="row">
            <div className="header-logo">
              <a href="/" className="header-logo-link">
                <img src="http://digdi.ru/wp-content/uploads/2019/01/cropped-SAVE_20190129_094653-1.jpeg" />
              </a>
            </div>
            <div className="primary-nav animate-dropdown">
              <div className="clearfix">
                <button className="navbar-toggler hidden-sm-up pull-right flip" type="button" data-toggle="collapse"
                        data-target="#default-header">
                  &#9776;
                </button>
              </div>
              <div className="collapse navbar-toggleable-xs" id="default-header">
                <nav>
                  <ul id="menu-main-menu" className="nav nav-inline yamm">
                    <li className="menu-item"><a title="main" href="/" aria-haspopup="false">Товары</a></li>
                    <li className="menu-item"><a title="dostavka" href="#" aria-haspopup="false">Оплата и доставка</a></li>
                    <li className="menu-item"><a title="about" href="#">О компании</a></li>
                    <li className="menu-item"><a title="contacts" href="#">Контакты</a></li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="header-support-info">
              <div className="media">
                <span className="media-left support-icon media-middle"><i className="ec ec-support"></i></span>
                <div className="media-body">
                  <span className="support-number"><strong>Тел:</strong> +7 (800) 856 80 60</span><br/>
                  <span className="support-email">Email: info@digdi.ru</span>
                  {isAuthenticated ? authLinks : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(
  Navbar
);
