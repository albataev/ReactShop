import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from '../../components/common/TextFieldGroup';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  onSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(loginData);

    this.props.loginUser(loginData);

  };


  render() {

    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Вход</h1>
              <p className="lead text-center">Войти в панель администрирования</p>
              <form>
                <TextFieldGroup
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                />
                <TextFieldGroup
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                />
                <input
                  type="submit"
                  value="Войти"
                  className="btn btn-info btn-block mt-4"
                  onClick={this.onSubmit}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
