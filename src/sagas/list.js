import { call, put, takeLatest } from "redux-saga/effects"
import { message } from "antd"
import * as actionTypes from "../actions/list"
import { request } from "../utils/methods"

function* getListData(action) {
  console.log(action)
  try {
    const response = yield call(request, "/mock")
    if (response.code === 200) {
      yield put({
        type: actionTypes.GET_LIST_SUCC,
        payload: response.data
      })
    } else {
      message.error(response.desc)
      yield put({
        type: actionTypes.GET_LIST_FAIL
      })
    }
  } catch (error) {
    message.error(error)
    yield put({
      type: actionTypes.GET_LIST_FAIL
    })
  }
}

export function* watchGetList() {
  yield takeLatest(actionTypes.GET_LIST, getListData)
}
