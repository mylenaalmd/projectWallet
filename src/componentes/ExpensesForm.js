import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { editExpensivesEnd, saveValuesExpensive } from '../actions';

const ALIMENTAÇÃO = 'alimentação';

class ExpensesForm extends React.Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    tag: ALIMENTAÇÃO,
    method: 'Dinheiro',
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  btnClickAdd =() => {
    const { value, description, currency, method, tag } = this.state;
    const { valuesSave, expenses } = this.props;
    const obj = { id: expenses.length, value, currency, method, tag, description };

    valuesSave(obj);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      tag: ALIMENTAÇÃO,
      method: 'Dinheiro',
    });
  }

  btnClickEdit = () => {
    const { value, description, currency, tag, method } = this.state;
    const { idOpenEdit, endEditExpense, expenses } = this.props;
    const obj = { id: idOpenEdit, value, currency, method, tag, description };

    const filterExpenses = expenses.map((item) => (item.id === idOpenEdit
      ? {
        ...obj, exchangeRates: item.exchangeRates } : item));
    endEditExpense(filterExpenses);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      tag: ALIMENTAÇÃO,
      method: 'Dinheiro',
    });
  }

  render() {
    const { currencies, openEdit } = this.props;
    const { value, description, currency, tag, method } = this.state;

    return (
      <div>
        <label htmlFor="value">
          <input
            data-testid="value-input"
            value={ value }
            name="value"
            type="number"
            onChange={ this.onChange }
          />
        </label>
        <label htmlFor="description">
          <input
            data-testid="description-input"
            type="text"
            name="description"
            onChange={ this.onChange }
            value={ description }
          />
        </label>
        <label htmlFor="currency">
          <select
            name="currency"
            onChange={ this.onChange }
            value={ currency }
            aria-label="moeda"
          >
            {
              currencies.map((item) => (
                <option
                  value={ item }
                  key={ item }
                  id="currency"
                >
                  {item}

                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method">
          <select
            name="method"
            data-testid="method-input"
            onChange={ this.onChange }
            value={ method }
          >
            <option id="method">Dinheiro</option>
            <option id="method">Cartão de crédito</option>
            <option id="method">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.onChange }
            value={ tag }
          >
            <option id="tag">Alimentação</option>
            <option id="tag">Lazer</option>
            <option id="tag">Trabalho</option>
            <option id="tag">Transporte</option>
            <option id="tag">Saúde</option>

          </select>
        </label>
        {
          openEdit
            ? (
              <button
                type="button"
                onClick={ this.btnClickEdit }
              >
                Editar despesa
              </button>
            ) : (
              <button
                type="button"
                onClick={ this.btnClickAdd }
              >
                Adicionar despesa
              </button>
            )
        }
      </div>
    );
  }
}

ExpensesForm.propTypes = {
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  openEdit: propTypes.bool.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  idOpenEdit: propTypes.number.isRequired,
  valuesSave: propTypes.func.isRequired,
  endEditExpense: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  valuesSave: (obj) => dispatch(saveValuesExpensive(obj)),
  endEditExpense: (expenses) => dispatch(editExpensivesEnd(expenses)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  openEdit: state.wallet.openEdit,
  expenses: state.wallet.expenses,
  idOpenEdit: state.wallet.idOpenEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
