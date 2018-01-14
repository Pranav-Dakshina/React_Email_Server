import { applyMiddleware, createStore, compose } from "redux"

import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./reducers"

const middleware = applyMiddleware(promise(), thunk, createLogger());
//const middleware = applyMiddleware(promise(), thunk);

const composeEnchancers =
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnchancers(middleware))
//export default createStore(reducer, middleware)
