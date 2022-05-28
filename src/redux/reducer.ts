import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import layoutSlice from './slices/layoutSlice';

export const whitelist = [];

export const rootReducer = combineReducers({
  userSlice,
  layoutSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export type PayloadName = 'payload';
