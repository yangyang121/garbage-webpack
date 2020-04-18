export default function (reducers: any) {
  return (state: any = {}, action: any) => {
    const result: any = {};
    Object.keys(reducers).forEach((key) => {
      result[key] = reducers[key](state[key], action);
    });
    return result;
  };
}
