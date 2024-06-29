import { orderBurgerApi } from '@api';
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

const fetchDetailOrder = createAsyncThunk(
  'orderDetail/fetchDetailOrder',
  async (id: string[]) => orderBurgerApi(id)
);

export const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState,
  reducers: {},
  selectors: {
    getOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailOrder.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchDetailOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
      })
      .addCase(fetchDetailOrder.rejected, (state, action) => {
        state.error =
          action.error.message || 'Ошибка в получении данных заказа';
      });
  }
});

export const orderDetailReducer = orderDetailSlice.reducer;
export const { getOrder } = orderDetailSlice.selectors;
