import { expect, describe, test } from '@jest/globals';
import { feedReducer, initialState, fetchFeed } from './feedSlice';

describe('проверка функциональности feedReducer', () => {
  const mockFeedOrders = {
    success: true,
    orders: [
      {
        _id: '669a5149119d45001b4fa039',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0940'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный метеоритный бургер',
        createdAt: '2024-07-19T11:43:05.495Z',
        updatedAt: '2024-07-19T11:43:05.983Z',
        number: 46449
      },
      {
        _id: '669a507a119d45001b4fa037',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0947',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa093f'
        ],
        status: 'done',
        name: 'Фалленианский краторный бессмертный минеральный метеоритный бургер',
        createdAt: '2024-07-19T11:39:38.926Z',
        updatedAt: '2024-07-19T11:39:39.361Z',
        number: 46447
      },
      {
        _id: '66998903119d45001b4f9ec0',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный space люминесцентный бургер',
        createdAt: '2024-07-18T21:28:35.447Z',
        updatedAt: '2024-07-18T21:28:35.891Z',
        number: 46400
      }
    ],
    total: 46075,
    totalToday: 188
  };
  test('Тест feedReducer при fetchFeed в состоянии pending', () => {
    const action = { type: fetchFeed.pending.type };
    const newState = feedReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
  test('Тест feedReducer при fetchFeed в состоянии fulfilled', () => {
    const action = { type: fetchFeed.fulfilled.type, payload: mockFeedOrders };
    const expectedResult = {
      ...initialState,
      orders: mockFeedOrders.orders,
      total: mockFeedOrders.total,
      totalToday: mockFeedOrders.totalToday
    };
    const newState = feedReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест feedReducer при fetchFeed в состоянии rejected', () => {
    const action = { type: fetchFeed.rejected.type };
    const expectedResult = {
      ...initialState,
      error: 'Ошибка в получении ленты заказов'
    };
    const newState = feedReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
});
