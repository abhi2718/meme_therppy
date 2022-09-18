export const REQ_FOR_LOAD_RESOURCE = 'REQ_FOR_LOAD_RESOURCE';
export const REQ_FOR_LOAD_RESOURCE_SUCCESS = 'REQ_FOR_LOAD_RESOURCE_SUCCESS';
export const REQ_FOR_LOAD_RESOURCE_FAIL = 'RREQ_FOR_LOAD_RESOURCE_FAIL';
import {BASE_URL} from '../index';

export const getResourceAction =
    (pageNumber) =>
     async (dispatch) => {
      dispatch({type: REQ_FOR_LOAD_RESOURCE});
      try {
        const response = await fetch(`${BASE_URL}=${pageNumber}`,{
            method: 'GET',
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
          });
          const data = await response.json();
          if (response.ok){
             dispatch({
                type: REQ_FOR_LOAD_RESOURCE_SUCCESS,
                payload: {...data},
               });
          }else{
            dispatch({
                type: REQ_FOR_LOAD_RESOURCE_FAIL,
                payload: {...data},
               });
          }
      } catch (error) {
          console.log(error);
          dispatch({
            type: REQ_FOR_LOAD_RESOURCE_FAIL,
            payload: {...error},
           });
      }
    };