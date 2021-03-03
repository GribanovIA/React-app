import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
// Импортируем редюсер
import { reducer as formReducer } from "redux-form";
import { authReducer } from "../Reducers/auth-reducer";

let reducers = combineReducers({
  form: formReducer,
  auth: authReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;