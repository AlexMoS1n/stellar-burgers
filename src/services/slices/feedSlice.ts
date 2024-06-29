import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface IFeedState {
  orders: TOrder[];
  totalSum: {
    totalToDay: number | null;
    totalAllTime: number | null;
  };
  error: string | null;
}

const initialState: IFeedState = {
  orders: [],
  totalSum: {
    totalToDay: null,
    totalAllTime: null
  },
  error: null
};

export const fetchFeed = createAsyncThunk('feed/fetchFeed', async () =>
  getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeed: (state) => state,
    getOrders: (state) => state.orders,
    getTotalSum: (state) => state.totalSum
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.orders = [];
        state.totalSum = {
          totalToDay: null,
          totalAllTime: null
        };
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.totalSum = {
          totalToDay: action.payload.totalToday,
          totalAllTime: action.payload.total
        };
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.error =
          action.error.message || 'Ошибка в получении ленты заказов';
      });
  }
});

export const feedReducer = feedSlice.reducer;
export const { getFeed, getOrders, getTotalSum } = feedSlice.selectors;
