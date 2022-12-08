import { configureStore, Action } from '@reduxjs/toolkit';
import rootReducer, { RootState } from '../reducers';
import { ThunkAction } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
