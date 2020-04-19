export default function createStore(reducer: any, enhancer?: any) {
  if (typeof enhancer === "function") {
    return enhancer(createStore)(reducer);
  }

  let state: any = undefined;
  let listeners: any = [];

  function getState() {
    return state;
  }

  function subscribe(listener: Function) {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  function dispatch(action: any) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
    return action;
  }

  dispatch({ type: "init" });

  return {
    getState,
    subscribe,
    dispatch,
  };
}
