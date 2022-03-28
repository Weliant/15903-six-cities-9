import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { appData } from './app-data/app-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.data]: appData.reducer,
  [NameSpace.user]: userProcess.reducer,
});
