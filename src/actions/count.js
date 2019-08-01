export const ADD_COUNT = "ADD_COUNT"
export const REDUCE_COUNT = "REDUCE_COUNT"

export const addCount = payload => ({
  type: ADD_COUNT,
  payload
})

export const reduceCount = payload => ({
  type: REDUCE_COUNT,
  payload
})
