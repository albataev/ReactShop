import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class NavbarNew extends React.Component {
    constructor(props) {
        super(props);
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
        const { isAuthenticated } = this.props.auth;
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
            <header className="" style={{ backgroundColor: '#fed700', marginBottom: '10px' }}>
                <div className="container">
                    <div className="row justify-content-start align-items-end">
                        <div className="col-5 d-lg-none">
                            <h4 className="mobile-header">Digdi.ru</h4>
                            <span className="mobile-subheader">
                                Электронный дискаунтер
                            </span>
                        </div>
                        <div className="col-7 d-lg-none contacts-top">
                            <span className="support-number">
                                <i className="fas fa-phone" />
                                {' '}
                                +7 (800) 856 80 60
                            </span>
                            <br />
                            <span className="support-email">
                                <i className="far fa-envelope" />
                                {' '}
                                info@digdi.ru
                            </span>
                        </div>
                        <div className="col-3 logo d-none d-lg-block">
                            <Link to="/">
                                <img alt="logo" src="/logo.png" />
                            </Link>
                        </div>
                        <div className="col-6">
                            <Navbar color="faded" light expand="md">
                                <NavbarToggler onClick={this.toggle} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <NavLink href="/">Каталог</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="/доставка-и-оплата">Доставка&nbsp;и&nbsp;оплата</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="/гарантия">Гарантия</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="/about">О&nbsp;нас</NavLink>
                                        </NavItem>
                                        {isAuthenticated ? authLinks : null}

                                    </Nav>
                                </Collapse>
                            </Navbar>
                        </div>
                        <div className="col-3 d-none d-lg-block">
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

NavbarNew.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(NavbarNew);
