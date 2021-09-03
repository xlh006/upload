import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import decode from 'jwt-decode';
import App from './App';
import store from '../src/redux/store'
import {syncinfo} from '../src/redux/login_action'


const tk = localStorage.getItem('@#@TOKEN');
// 解析 TOKEN 并同步到 Redux
if (tk) {
  try {
    store.dispatch(syncinfo(decode(tk)))
  } catch {
    localStorage.removeItem('@#@TOKEN');
    window.location.href = '/login';
  }
}

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>,
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
