import { applyMiddleware, createStore, compose } from "redux";

// import { createLogger } from "redux-logger"
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from "./reducers";

const persistConfig = {
  key: 'root',
  storage: storage,
};

// const middleware = applyMiddleware(promise(), thunk, createLogger());
const middleware = applyMiddleware(promise(), thunk);

const persistedReducer = persistReducer(persistConfig, reducer);

// const composeEnchancers =
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default createStore(reducer, composeEnchancers(middleware))
// export default createStore(reducer, middleware)

export default () => {
  let storeConfig = createStore(persistedReducer, middleware);
  let persistor = persistStore(storeConfig);
  return { storeConfig, persistor };
};
