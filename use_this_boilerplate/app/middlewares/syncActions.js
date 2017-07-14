function createGlobalMiddleware(portName, key = 'global') {
  return (/* { dispatch, getState } */) => next => action => {
    if (action && action[key]) {
      /*
       Send action to background
      */
      chrome.runtime.sendMessage({
        portName,
        payload: action,
      });
    }
    return next(action);
  };
}

const syncActionMiddleware = createGlobalMiddleware();
export default syncActionMiddleware;

syncActionMiddleware.withKeys = createGlobalMiddleware;
