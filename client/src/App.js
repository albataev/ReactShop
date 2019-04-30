import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import store from './store';

import PrivateRoute from './components/common/PriveteRoute';

import NavbarNew from './components/layout/NavbarNew';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import AddItem from './components/dashboard/AddItem';
import EditItem from './components/dashboard/EditItem';
import Catalog from './components/catalog/Catalog';
import NotFound from './components/not-found/NotFound';

import './App.css';
import './assets/images/fav-icon.png';

// Check for token
if (localStorage.jwtToken) {
    // set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // decode token
    const decoded = jwtDecode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    // check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        // Redirect to login:
        window.location.href = '/login';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <NavbarNew />
                        <div id="" className="">
                            <Switch>
                                <Route exact path="/" component={Catalog} />
                                {/* <Route exact path="table" component={ReactTable} /> */}
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/landing" component={Landing} />
                                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                                <PrivateRoute exact path="/add-item" component={AddItem} />
                                <PrivateRoute exact path="/edit-item" component={EditItem} />
                                <Route path="/tovary/:categoryname" component={Catalog} />
                                <Route path="/tovary/:categoryname/:itemName" component={Catalog} />
                                <Route exact path="/not-found" component={NotFound} />
                                {/* <Redirect to="/not-found" /> */}
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
