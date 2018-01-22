import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/lib/integration/react'

import { BrowserRouter, Switch } from "react-router-dom"
import { CookiesProvider } from 'react-cookie'

import Index from "./pages/Index"
import store from "./store"
import '../css/styles.scss'

let { storeConfig, persistor } = store()

const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={storeConfig}>
    <PersistGate loading={null} persistor={persistor}>
      <CookiesProvider>
        <BrowserRouter>
          <Switch>
            <Index />
          </Switch>
        </BrowserRouter>
      </CookiesProvider>
    </PersistGate>
  </Provider>, app);
