import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import { BrowserRouter, Switch } from "react-router-dom"
import { CookiesProvider } from 'react-cookie'

import Index from "./pages/Index"
import store from "./store"

const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <Switch>
          <Index />
        </Switch>
      </BrowserRouter>
    </CookiesProvider>
  </Provider>, app);
