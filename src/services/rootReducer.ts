import {
  burgerIngredientsReducer,
  burgerIngredientsSliceName
} from './slices/burgerIngredientsSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { feedReducer, feedSliceName } from './slices/feedSlice';
import { orderDetailName, orderDetailReducer } from './slices/orderSlice';
import {
  burgerConstructorReducer,
  burgerConstructorSliceName
} from './slices/burgerConstructorSlice';
import { authUserReducer, authUserSliceName } from './slices/authUserSlice';
import { userOrdersReducer, ordersSliceName } from './slices/userOrdersSlice';

export const rootReducer = combineReducers({
  [burgerIngredientsSliceName]: burgerIngredientsReducer,
  [burgerConstructorSliceName]: burgerConstructorReducer,
  [feedSliceName]: feedReducer,
  [orderDetailName]: orderDetailReducer,
  [authUserSliceName]: authUserReducer,
  [ordersSliceName]: userOrdersReducer
});
