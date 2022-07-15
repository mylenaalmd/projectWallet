// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_CURRENCIES,
  API_REQUEST,
  GET_VALUES,
  FAIL_REQUEST,
  REMOVE_EXPENSIVES,
  EDIT_EXPENSIVES,
  EDIT_EXPENSIVES_END,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  fetching: false,
  error: '',
  openEdit: false,
  idOpenEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES:
    return {
      ...state,
      fetching: false,
      currencies: action.payload.currencies,
    };
  case API_REQUEST:
    return {
      ...state,
      fetching: true,
    };
  case GET_VALUES:
    return {
      ...state,
      fetching: false,
      expenses: [...state.expenses, action.payload.newExpensives],
    };
  case REMOVE_EXPENSIVES:
    return {
      ...state,
      expenses: action.payload.expenses,
    };
  case EDIT_EXPENSIVES:
    return {
      ...state,
      openEdit: true,
      idOpenEdit: action.payload.id,
    };
  case EDIT_EXPENSIVES_END:
    return {
      ...state,
      openEdit: false,
      idOpenEdit: 0,
      expenses: action.payload.expenses,
    };
  case FAIL_REQUEST:
    return {
      ...state,
      fetching: false,
      error: action.payload.error,
    };
  default:
    return state;
  }
};

export default wallet;
