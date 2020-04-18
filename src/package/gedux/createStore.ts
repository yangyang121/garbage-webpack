export default function (reducer: any) {
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
  }

  dispatch({ type: "init" });

  return {
    getState,
    subscribe,
    dispatch,
  };
}
