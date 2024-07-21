import { expect, describe, test } from '@jest/globals';
import {
  fetchUserOrders,
  initialState,
  userOrdersReducer
} from './userOrdersSlice';
describe('проверка функциональности userOrdersReducer', () => {
  const mockUserOrders = [
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
  ];

  test('Тест userOrdersReducer при fetchUserOrders в состоянии pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const newState = userOrdersReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
  test('Тест userOrdersReducer при fetchUserOrders в состоянии fulfilled', () => {
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: mockUserOrders
    };
    const expectedResult = { ...initialState, orders: mockUserOrders };
    const newState = userOrdersReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест userOrdersReducer при fetchUserOrders в состоянии rejected', () => {
    const action = { type: fetchUserOrders.rejected.type };
    const expectedResult = {
      ...initialState,
      error: 'Ошибка в получении истории заказов'
    };
    const newState = userOrdersReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
});
