import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { currenciesApi } from '../actions';
import ExpensesForm from '../componentes/ExpensesForm';
import ExpensesTable from '../componentes/ExpensesTable';

class Wallet extends React.Component {
  componentDidMount = () => {
    const { fetchCurrenciesApi } = this.props;
    fetchCurrenciesApi();
  }

  numberConverter = (number) => Number(number).toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');

  render() {
    const { email, expenses } = this.props;

    const expensivesTotal = this.numberConverter(expenses.reduce(
      (acc, curr) => Number(curr.value * curr.exchangeRates[curr.currency].ask) + acc, 0,
    ));

    return (

      <div>
        <header>
          <h3>TrybeWallet</h3>

          <div>
            <p data-testid="email-field">{email}</p>
            <p data-testid="total-field">{expensivesTotal}</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>

          <ExpensesForm />

        </header>
        <main>
          <ExpensesTable />
        </main>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesApi: () => dispatch(currenciesApi()),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  fetchCurrenciesApi: propTypes.func.isRequired,
  email: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
