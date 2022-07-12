// Coloque aqui suas actions

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_PASSWORD = 'ADD_PASSWORD';
export const inputSaveEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});
export const inputSavePassword = (password) => ({
  type: ADD_PASSWORD,
  payload: password,
});
