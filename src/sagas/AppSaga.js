/* eslint-disable no-constant-condition */
// import { take, put, fork, call, select } from 'redux-saga/effects';
// import {
//
// } from '../actions/actionTypes';
// import { get } from '../api';
//
// function* pingServer() {
//   while (true) {
//     yield take(PING);
//     const response = yield call(get, '/ping');
//     if (!response || !response.data.success) {
//       yield put({
//         type: PING_SUCCESS,
//         data: false,
//       });
//     } else {
//       yield put({
//         type: PING_SUCCESS,
//         data: true,
//       });
//     }
//   }
// }

export default function* () {
  // yield fork(pingServer);
}
