import { LoginAction } from '@redux/action/authAction';
import { loginError, loginStart, loginSuccess } from '@redux/slices/authSlice';
import axios from '@request/axios';
import { put, takeEvery } from 'redux-saga/effects';
import { loginAPI } from 'src/request/userRequest';
import Constant from 'src/utils/constant';

function* watchLoginStart({ payload }: LoginAction) {
  try {
    const response = yield loginAPI(payload);
    if (Constant.CODE.SUCCESS_RESPONSE === response?.code) {
      yield put(loginSuccess(response.data));
      yield axios.setTokenRequest(response.data?.token as any);
    } else {
      yield put(loginError());
    }
  } catch (error: any) {
    yield put(loginError());
  }
}

export default function* authSaga(): any {
  yield takeEvery(loginStart, watchLoginStart);
}
