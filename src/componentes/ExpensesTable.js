import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpensives, removeExpensives } from '../actions';

class ExpensesTable extends React.Component {
  btnClickDelete = (id) => {
    const { expenses, removeExpenses } = this.props;
    const filterExpenses = expenses.filter((item) => item.id !== id);
    removeExpenses(filterExpenses);
  }

  btnClickEdit = (id) => {
    const { editExpenses } = this.props;
    editExpenses(id);
  }

  numberconverter = (numero) => Number(numero).toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')

  render() {
    const { openEdit, expenses } = this.props;
    return (
      <table className="table">
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th> Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        {
          expenses.map((item) => (
            <tr key={ item.id }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{this.numberconverter(item.value)}</td>
              <td>{item.exchangeRates[item.currency].name.split('/')[0]}</td>
              <td>{this.numberconverter(item.exchangeRates[item.currency].ask)}</td>
              <td>
                {
                  this.numberconverter(item.value * item.exchangeRates[item.currency].ask)
                }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  disabled={ openEdit }
                  onClick={ () => this.btnClickEdit(item.id) }
                >
                  Editar despesa
                </button>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.btnClickDelete(item.id) }
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))
        }
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  openEdit: propTypes.bool.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  removeExpenses: propTypes.func.isRequired,
  editExpenses: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeExpenses: (filterExpenses) => dispatch(removeExpensives(filterExpenses)),
  editExpenses: (id) => dispatch(editExpensives(id)),
});

const mapStateToProps = (state) => ({
  openEdit: state.wallet.openEdit,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
