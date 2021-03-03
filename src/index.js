import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import store from './Redux-store/redux-store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App state={store.getState()} />
  </Provider>,
  document.getElementById('root')
);
