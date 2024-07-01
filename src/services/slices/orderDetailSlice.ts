import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IOrderDetailState {
  order: TOrder | null;
  error: string | null;
}

export const initialState: IOrderDetailState = {
  order: null,
  error: null
};

export const fetchDetailOrder = createAsyncThunk(
  'orderDetail/fetchDetailOrder',
  async (numberOrder: number, { dispatch }) => {
    dispatch(clearOrderState());
    return getOrderByNumberApi(numberOrder);
  }
);

const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailOrder.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchDetailOrder.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
      })
      .addCase(fetchDetailOrder.rejected, (state, action) => {
        state.error = 'Ошибка в получении данных заказа';
      });
  }
});

export const { clearOrderState } = orderDetailSlice.actions;
export const orderDetailReducer = orderDetailSlice.reducer;
export const orderDetailName = orderDetailSlice.name;
export const { getOrder } = orderDetailSlice.selectors;
