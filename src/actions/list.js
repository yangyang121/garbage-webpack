export const GET_LIST = "GET_LIST"
export const GET_LIST_SUCC = "GET_LIST_SUCC"
export const GET_LIST_FAIL = "GET_LIST_FAIL"

export const getList = () => ({ type: GET_LIST })
export const getListSucc = payload => ({
  type: GET_LIST_SUCC,
  payload
})
export const getListFail = payload => ({
  type: GET_LIST_FAIL,
  payload
})
