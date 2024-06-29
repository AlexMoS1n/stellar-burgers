import { ThunkAction, ThunkDispatch, thunk } from 'redux-thunk';
import {
  burgerIngredientsReducer,
  burgerIngredientsSlice
} from './slices/burgerIngredientsSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { feedReducer, feedSlice } from './slices/feedSlice';
import { ordersReducer, ordersSlice } from './slices/ordersSlice';
import {
  orderDetailReducer,
  orderDetailSlice
} from './slices/orderDetailSlice';

const rootReducer = combineReducers({
  [burgerIngredientsSlice.name]: burgerIngredientsReducer,
  [feedSlice.name]: feedReducer,
  [ordersSlice.name]: ordersReducer,
  [orderDetailSlice.name]: orderDetailReducer
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
