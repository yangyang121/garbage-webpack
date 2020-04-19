import compose from "./compose";

export default function applyMiddleware(...middlewares: any[]) {
  return (createStore: any) => (reducer: Function) => {
    const store = createStore(reducer);
    let dispatch: any = () => {
      throw new Error(
        "Dispatching while constructing your middleware is not allowed. " +
          "Other middleware would not be applied to this dispatch."
      );
    };
    const storeAPI = {
      getState: store.getState,
      dispatch: () => dispatch(),
    };
    const chain = middlewares.map((middleware) => middleware(storeAPI));
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch,
    };
  };
}
