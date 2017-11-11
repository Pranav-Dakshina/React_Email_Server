import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Index from "./pages/Index"
import store from "./store"

const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  </Provider>, app);
