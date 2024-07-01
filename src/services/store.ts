import { ThunkAction, ThunkDispatch, thunk } from 'redux-thunk';
import {
  burgerIngredientsReducer,
  burgerIngredientsSliceName
} from './slices/burgerIngredientsSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { feedReducer, feedSliceName } from './slices/feedSlice';
import { orderDetailName, orderDetailReducer } from './slices/orderDetailSlice';
import {
  burgerConstructorReducer,
  burgerConstructorSliceName
} from './slices/burgerConstructorSlice';

const rootReducer = combineReducers({
  [burgerIngredientsSliceName]: burgerIngredientsReducer,
  [burgerConstructorSliceName]: burgerConstructorReducer,
  [feedSliceName]: feedReducer,
  [orderDetailName]: orderDetailReducer
});
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
