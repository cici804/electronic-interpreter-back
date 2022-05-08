import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from './reducer/index';
// 同步dispatch转异步
import thunk from "redux-thunk";
// react-dev-tools插件
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);
export default store;
