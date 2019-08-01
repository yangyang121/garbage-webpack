import { all } from 'redux-saga/effects'
import { watchGetList } from "./list"

export default function* rootSaga() {
  yield all([watchGetList()])
}
