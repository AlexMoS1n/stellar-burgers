import { expect, describe, test } from '@jest/globals';
import {
  burgerIngredientsReducer,
  fetchBurgerIngredients,
  initialState
} from './burgerIngredientsSlice';

describe('проверка функциональности burgerIngredientsReducer', () => {
  const mockResultState = {
    ...initialState,
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
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa093f',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0946',
        name: 'Хрустящие минеральные кольца',
        type: 'main',
        proteins: 808,
        fat: 689,
        carbohydrates: 609,
        calories: 986,
        price: 300,
        image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
        image_large:
          'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0944',
        name: 'Соус традиционный галактический',
        type: 'sauce',
        proteins: 42,
        fat: 24,
        carbohydrates: 42,
        calories: 99,
        price: 15,
        image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
      }
    ]
  };

  test('Тест burgerIngredientsReducer при fetchBurgerIngredients в состоянии pending', () => {
    const action = {
      type: fetchBurgerIngredients.pending.type
    };
    const expectedResult = {
      ...initialState,
      isLoading: true,
      error: null
    };
    const newState = burgerIngredientsReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест burgerIngredientsReducer при fetchBurgerIngredients в состоянии fulfilled', () => {
    const action = {
      type: fetchBurgerIngredients.fulfilled.type,
      payload: mockResultState.ingredients
    };
    const expectedResult = {
      error: null,
      isLoading: false,
      ingredients: mockResultState.ingredients
    };
    const newState = burgerIngredientsReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });

  test('Тест burgerIngredientsReducer при fetchBurgerIngredients в состоянии rejected', () => {
    const action = {
      type: fetchBurgerIngredients.rejected.type
    };
    const expectedResult = {
      ...initialState,
      error: 'Ошибка в получении данных о ингридиентах'
    };
    const newState = burgerIngredientsReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
});
