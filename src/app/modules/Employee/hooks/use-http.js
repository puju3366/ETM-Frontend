import { useReducer, useCallback } from "react";

const httpReducer = (state, action) => {
    if (action.type === 'SEND') {
      return {
        data: null,
        error: null,
        status: 'pending',
      };
    }
  
    if (action.type === 'SUCCESS') {
      return {
        data: action.responseData,
        error: null,
        status: 'completed',
      };
    }
  
    if (action.type === 'ERROR') {
      return {
        data: null,
        error: action.errorMessage,
        status: 'completed',
      };
    }
  
    return state;
  }


  function useHttp(requestFunction, startWithPending = false) {

  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
  });

  
  const sendRequest = useCallback(
    async function (requestData) {
      //console.log(requestData,"requestData")
      dispatch({ type: 'SEND' });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: 'SUCCESS', responseData });
      } catch (error) {
        dispatch({
          type: 'ERROR',
          errorMessage: error.message || 'Something went wrong!',
        });
      }
    },
    [requestFunction]
  );
  // console.log('http 56',sendRequest);

  //console.log('usehttp 56',sendRequest, httpState);
  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;