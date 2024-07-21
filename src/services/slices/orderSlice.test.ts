import { expect, describe, test } from '@jest/globals';
import {
  fetchCreateOrder,
  fetchDetailOrder,
  initialState,
  orderDetailReducer
} from './orderSlice';

describe('проверка функциональности userOrdersReducer', () => {
  const mockOrderDetail = {
    success: true,
    orders: [
      {
        _id: '669a82a7119d45001b4fa0d1',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093f'
        ],
        owner: '669a8279119d45001b4fa0cf',
        status: 'done',
        name: 'Био-марсианский флюоресцентный люминесцентный бессмертный бургер',
        createdAt: '2024-07-19T15:13:43.047Z',
        updatedAt: '2024-07-19T15:13:43.478Z',
        number: 46467,
        __v: 0
      }
    ]
  };
  const mockOrderCreate = {
    success: true,
    name: 'Флюоресцентный space фалленианский альфа-сахаридный метеоритный бургер',
    order: {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0940',
          name: 'Говяжий метеорит (отбивная)',
          type: 'main',
          proteins: 800,
          fat: 800,
          carbohydrates: 300,
          calories: 2674,
          price: 3000,
          image: 'https://code.s3.yandex.net/react/code/meat-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-04-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0947',
          name: 'Плоды Фалленианского дерева',
          type: 'main',
          proteins: 20,
          fat: 5,
          carbohydrates: 55,
          calories: 77,
          price: 874,
          image: 'https://code.s3.yandex.net/react/code/sp_1.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0948',
          name: 'Кристаллы марсианских альфа-сахаридов',
          type: 'main',
          proteins: 234,
          fat: 432,
          carbohydrates: 111,
          calories: 189,
          price: 762,
          image: 'https://code.s3.yandex.net/react/code/core.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0943',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0
        }
      ],
      _id: '669a88e6119d45001b4fa0dd',
      owner: {
        name: 'Жак-Ив Кусто',
        email: 'alex-m_777@mail.ru',
        createdAt: '2024-07-04T10:27:21.046Z',
        updatedAt: '2024-07-04T10:47:58.662Z'
      },
      status: 'done',
      name: 'Флюоресцентный space фалленианский альфа-сахаридный метеоритный бургер',
      createdAt: '2024-07-19T15:40:22.005Z',
      updatedAt: '2024-07-19T15:40:22.490Z',
      number: 46470,
      price: 6692
    }
  };
  test('Тест orderDetailReducer при fetchDetailOrder в состоянии pending', () => {
    const action = { type: fetchDetailOrder.pending.type };
    const expectedResult = {
      ...initialState,
      orderRequest: true
    };
    const newState = orderDetailReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест orderDetailReducer при fetchDetailOrder в состоянии fulfilled', () => {
    const action = {
      type: fetchDetailOrder.fulfilled.type,
      payload: mockOrderDetail
    };
    const expectedResult = {
      ...initialState,
      order: mockOrderDetail.orders[0]
    };
    const newState = orderDetailReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест orderDetailReducer при fetchDetailOrder в состоянии rejected', () => {
    const action = { type: fetchDetailOrder.rejected.type };
    const expectedResult = {
      ...initialState,
      errorDetailOrder: 'Ошибка в получении данных заказа'
    };
    const newState = orderDetailReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест orderDetailReducer при fetchCreateOrder в состоянии pending', () => {
    const action = { type: fetchCreateOrder.pending.type };
    const expectedResult = {
      ...initialState,
      orderRequest: true
    };
    const newState = orderDetailReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест orderDetailReducer при fetchCreateOrder в состоянии fulfilled', () => {
    const action = {
      type: fetchCreateOrder.fulfilled.type,
      payload: mockOrderCreate
    };
    const expectedResult = {
      ...initialState,
      order: mockOrderCreate.order
    };
    const newState = orderDetailReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест orderDetailReducer при fetchCreateOrder в состоянии rejected', () => {
    const action = { type: fetchCreateOrder.rejected.type };
    const expectedResult = {
      ...initialState,
      errorCreateOrder: 'Ошибка в создании заказа'
    };
    const newState = orderDetailReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
});
