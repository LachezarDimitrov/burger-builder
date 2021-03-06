import { watchAuth, watchBurgerBuilder, watchOrder } from './store/sagas/index';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import registerServiceWorker from './registerServiceWorker';
import orderReducer from './store/reducers/order';
import { BrowserRouter } from 'react-router-dom';
import authReducer from './store/reducers/auth';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import React from 'react';
import App from './App';
import './index.css';

const composeEnhancers =
  process.env.NODE_ENV === 'development' ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    null || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,

  order: orderReducer,

  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth);

sagaMiddleware.run(watchBurgerBuilder);

sagaMiddleware.run(watchOrder);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
