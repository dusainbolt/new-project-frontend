/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { VerifyOAuth2Action, VerifyOAuthSuccess2Action } from '@redux/action/userAction';
import { getPersistConfig } from '@redux/storage';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { UserSlice } from '@type/user';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: UserSlice = {
  loadingLogin: false,
};

const hydrate = createAction<AppState>(HYDRATE);

const sliceName = 'userSlice';

const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    verifyOAuth2Start: (state: UserSlice, { payload }: VerifyOAuth2Action) => {
      state.loadingLogin = !!payload.access_token;
    },
    verifyOAuth2Success: (state: UserSlice, { payload }: VerifyOAuthSuccess2Action) => {
      state.loadingLogin = false;
      state.token = payload.token;
      state.user = { ...payload.user };
    },
    verifyOAuth2Error: (state: UserSlice) => {
      state.loadingLogin = false;
    },
    // loginStart: (state: UserSlice, { payload }: LoginAction) => {
    //   state.loadingLogin = true;
    //   state.signature = payload.signature;
    //   // state.role = payload.role;
    // },
    // loginSuccess: (state: UserSlice, { payload }: LoginSuccess) => {
    //   state.loadingLogin = false;
    //   state.address = payload.address;
    //   state.token = payload.token;
    // },
    // loginError: (state: UserSlice) => {
    //   state.loadingLogin = false;
    // },
    // logout: () => {
    //   return initialState;
    // },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload[sliceName],
      };
    });
  },
});

export const getUserSlice = (state: RootState): UserSlice => state[sliceName];

export const { verifyOAuth2Start, verifyOAuth2Success, verifyOAuth2Error } = userSlice.actions;

export default persistReducer(getPersistConfig(sliceName, { whitelist: ['token', 'user'] }), userSlice.reducer);
