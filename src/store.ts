import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { Models, models } from "./models";

export const store = init({
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<Models>;
export type RootState = RematchRootState<Models>;
