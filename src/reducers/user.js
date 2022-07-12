// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_EMAIL, ADD_PASSWORD } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const inputLogin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  case ADD_PASSWORD:
    return {
      ...state,
      password: action.payload,
    };
  default:
    return state;
  }
};

export default inputLogin;
