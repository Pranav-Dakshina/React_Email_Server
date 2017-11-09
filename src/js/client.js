import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
// import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Login from "./pages/Login"
import store from "./store"

const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
      <Login/>
  </Provider>, app);
