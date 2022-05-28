import { all } from 'redux-saga/effects';
import userSaga from './sagas/userSaga';

export default function* rootSaga(): any {
  yield all([userSaga()]);
}
