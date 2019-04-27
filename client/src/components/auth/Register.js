import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect} from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from '../../components/common/TextFieldGroup';

class Register extends Component {
  // No need if using arrow functions
  // constructor() {
  //   super();
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    };
    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this)
  // }

  componentWillReceiveProps(nextProps, nextContext) {
    // we are doing this to update errors and to leave our
    // error check in the inputs
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors})
    }
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    // second param "this.props.history" allows to use "history"
    // inside registerUser to redirect to login page if success
    // to do this need to use withRouter in "export default connect"
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    // const { user } = this.props.auth;
    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Регистрация</h1>
                <p className="lead text-center">Создать аккаунт на DevConnector</p>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    type="text"
                    name="name"
                    placeholder="Имя"
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                  />
                  <TextFieldGroup
                    type="email"
                    name="email"
                    placeholder="E-mail"
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
                  <TextFieldGroup
                    type="password"
                    name="password2"
                    placeholder="Подтвердить пароль"
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                  />
                  <input
                    type="submit"
                    value="Зарегистрироваться"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.proTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// to get access to redux auth state in our component:
const mapStateToProps = (state) => ({
  // this comes from the root reducer:
  auth: state.auth,
  errors: state.errors
});
// it is easy to use
// withrouter allows allows to export and use "history"
// inside authActions->registerUser
export default connect(mapStateToProps, {registerUser})(withRouter(Register));
