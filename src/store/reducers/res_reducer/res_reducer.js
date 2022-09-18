import {
    REQ_FOR_LOAD_RESOURCE,
    REQ_FOR_LOAD_RESOURCE_SUCCESS,
    REQ_FOR_LOAD_RESOURCE_FAIL,
  } from '../../actions/resource_action/res_action';
  export const resourceActionReducer = (
    state = {resource: null, loading: true, errMsg: null},
    action,
  ) => {
    switch (action.type) {
      case REQ_FOR_LOAD_RESOURCE:
        return {
          ...state,
          loading: true,
        };
      case REQ_FOR_LOAD_RESOURCE_SUCCESS:
        return {
          resource: action.payload,
          loading: false,
          errMsg: null,
        };
      case REQ_FOR_LOAD_RESOURCE_FAIL:
        return {
          ...state,
          loading: false,
          errMsg: action.payload,
        };
      default:
        return state;
    }
  };