import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Wallet extends React.Component {
  state = {
    valor: 0,
    cambio: 'BRL',
    currencies: [],
  }

  componentDidMount = () => {
    this.currenciesApi();
  }

  currenciesApi = async () => {
    const retornoApi = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((item) => item.json())
      .then((json) => json);
    this.setState({ currencies: [...retornoApi] });
    console.log(retornoApi);
  }

  render() {
    const { valor, cambio,
      currencies,
    } = this.state;
    const { email } = this.props;
    return (
      <div>
        <header>
          <h2 data-testid="email-field">{email}</h2>
          <h2 data-testid="total-field">{valor}</h2>
          <h2 data-testid="header-currency-field">{cambio}</h2>
        </header>
        <div>
          <h5>
            {
              currencies.filter((item) => (
                <h4>{item}</h4>
              ))
            }

          </h5>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
