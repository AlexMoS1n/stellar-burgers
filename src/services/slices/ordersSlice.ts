import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface IOrdersState {
  orders: TOrder[];
  error: string | null;
}

const initialState: IOrdersState = {
  orders: [],
  error: null
};

const fetchOrders = createAsyncThunk('orders/fetchOrders', async () =>
  getOrdersApi()
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.orders = [];
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.error = 'Ошибка в получении истории заказов';
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const ordersSliceName = ordersSlice.name;
export const { getOrders } = ordersSlice.selectors;
