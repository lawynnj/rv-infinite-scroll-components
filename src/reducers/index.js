import { combineReducers } from 'redux';

import dataReducer from './infiniteListData';

const rootReducer = combineReducers({
  data: dataReducer
});

export default rootReducer;