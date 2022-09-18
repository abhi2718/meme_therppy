import {combineReducers} from 'redux';
import {resourceActionReducer} from '../res_reducer/res_reducer';
export const rootReducer = combineReducers({
  resourceStore: resourceActionReducer,
});