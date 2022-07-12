import { combineReducers } from 'redux';
import inputLogin from './user';
import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const reducer = combineReducers({
  user: inputLogin,
  wallet });

export default reducer;
