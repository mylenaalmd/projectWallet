import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { inputSaveEmail } from '../actions';

const minNum = 6;
const validEmail = /^[a-z0-9]+@[a-z0-9]+\.[a-z]/i;

class Login extends React.Component {
  state = {
    password: '',
    email: '',
    buttonDisabled: true,
  }

  activatedBtn = () => {
    const { password, email } = this.state;
    if (password.length >= minNum && validEmail.test(email)) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.activatedBtn);
  }

  btnClick= () => {
    const { loginUser, history } = this.props;
    const { email } = this.state;
    loginUser(email);

    history.push('/carteira');
  }

  render() {
    const { password, email, buttonDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            <input
              data-testid="email-input"
              type="email"
              name="email"
              placeholder="Digite o email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            <input
              data-testid="password-input"
              type="text"
              name="password"
              placeholder="Digite sua senha"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            name="btn-login"
            onClick={ this.btnClick }
            disabled={ buttonDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (email) => dispatch(inputSaveEmail(email)),

});
Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  loginUser: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
