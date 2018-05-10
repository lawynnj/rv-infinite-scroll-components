import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import _ from 'lodash';
import axios from 'axios';
import './css/index.css';
import App from './components/App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

import 'react-virtualized/styles.css'; // only needs to be imported once

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Render your list
ReactDOM.render( 
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

