import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class NavbarNew extends React.Component {
    constructor(props) {
        super(props);

        // this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    onLogoutClick(e) {
        e.preventDefault();
        // this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Управление
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        <Link to="/dashboard">
                            Редактировать каталог
                        </Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        <a href="/" onClick={this.onLogoutClick.bind(this)}>
                            Выйти
                        </a>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );

        return (
            <header id="masthead" className="site-header header-v2" style={{ backgroundColor: '#fed700', marginBottom: '10px' }}>
                <div className="container">
                    <div className="row align-items-center justify-content-start">
                        <div className="col-2 logo d-none d-lg-block">
                            <Link to="/">
                                <img alt="logo" src="http://digdi.ru/wp-content/uploads/2019/01/cropped-SAVE_20190129_094653-1.jpeg" />
                            </Link>
                        </div>
                        <div className="col-4">
                            <Navbar color="faded" light expand="md">

                                <NavbarToggler onClick={this.toggle} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <NavLink href="#">Информация</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#">Контакты</NavLink>
                                        </NavItem>
                                        {isAuthenticated ? authLinks : null}

                                    </Nav>
                                </Collapse>
                            </Navbar>
                        </div>
                        <div className="col-3">
                            <div className="media" style={{ textAlign: 'right' }}>
                                <div className="media-body">
                                    <span className="support-number">
                                        <strong>Тел:</strong>
                                        {' '}
                                        +7 (800) 856 80 60
                                    </span>
                                    <br />
                                    <span className="support-email">Email: info@digdi.ru</span>
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
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(
    NavbarNew
);
