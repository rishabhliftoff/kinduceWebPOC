import {
  fork,
} from 'redux-saga/effects';
import App from './AppSaga';

export default function* root() {
  yield fork(App);
}
