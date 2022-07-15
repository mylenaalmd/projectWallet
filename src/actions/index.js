// Coloque aqui suas actions

export const ADD_EMAIL = 'ADD_EMAIL';
export const inputSaveEmail = (email) => ({
  type: ADD_EMAIL,
  payload: { email,
  },
});

export const API_REQUEST = 'API_REQUEST';
const apiRequest = () => ({
  type: API_REQUEST,
});
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const requiredAPI = (currencies) => ({
  type: FETCH_CURRENCIES,
  payload: {
    currencies,
  },
});

export const FAIL_REQUEST = 'FAIL_REQUEST';
const failRequest = (error) => ({
  type: FAIL_REQUEST,
  payload: {
    error,
  },
});

const getCurrencies = (currencies) => (dispatch) => {
  const arrayCurriencies = Object.keys(currencies).filter((item) => item !== 'USDT');
  return dispatch(requiredAPI(arrayCurriencies));
};

export const currenciesApi = () => (dispatch) => {
  dispatch(apiRequest());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => dispatch(getCurrencies(json)))
    .catch((error) => dispatch(failRequest(error)));
};

export const GET_VALUES = 'GET_VALUES';

const getValuesExchange = (exchangeRates, expenses) => ({
  type: GET_VALUES,
  payload: {
    newExpensives: { ...expenses, exchangeRates },
  },
});

export const saveValuesExpensive = (expense) => (dispatch) => {
  dispatch(apiRequest());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => dispatch(getValuesExchange(json, expense)))
    .catch((error) => dispatch(failRequest(error)));
};

export const REMOVE_EXPENSIVES = 'REMOVE_EXPENSIVES';
export const removeExpensives = (expenses) => ({
  type: REMOVE_EXPENSIVES,
  payload: {
    expenses,
  },
});

export const EDIT_EXPENSIVES = 'EDIT_EXPENSIVES';
export const editExpensives = (id) => ({
  type: EDIT_EXPENSIVES,
  payload: {
    id,
  },
});

export const EDIT_EXPENSIVES_END = 'EDIT_EXPENSIVES_END';
export const editExpensivesEnd = (expenses) => ({
  type: EDIT_EXPENSIVES_END,
  payload: {
    expenses,
  },
});
