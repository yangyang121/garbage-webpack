import { RootState, Dispatch } from "../store";

export const count = {
  state: 0, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state: number, payload: number) {
      return state + payload;
    },
  },
  effects: (dispatch: Dispatch) => ({
    async incrementAsync(payload: number = 1, rootState: RootState) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.count.increment(payload);
    },
  }),
};
