import { count } from "./count";

export interface Models {
  count: typeof count;
}
export const models = { count };
