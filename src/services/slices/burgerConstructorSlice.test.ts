import { expect, describe, test } from '@jest/globals';
import {
  addIngredientToBurgerConstructor,
  burgerConstructorReducer,
  initialState,
  deleteIngredientFromBurgerConstructor,
  changeIngredientLayer
} from './burgerConstructorSlice';

describe('проверка функциональности burgerConstructorReducer', () => {
  const bunConstructorIngredient = {
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
  };
  const mainConstructorIngredient = {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
  };
  const sauceConstructorIngredient = {
    _id: '643d69a5c3f7b9001cfa0944',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
  };
  const filledInitialState= {
    bun: { ...bunConstructorIngredient, id: 'binId' },
    ingredients: [
      { ...mainConstructorIngredient, id: 'mainId' },
      { ...sauceConstructorIngredient, id: 'sauseId' }
    ]
  };

  test('addIngredientToBurgerConstructor принимает bun', () => {
    const expectedResult = { ...initialState, bun: bunConstructorIngredient };
    const newState = burgerConstructorReducer(
      initialState,
      addIngredientToBurgerConstructor(bunConstructorIngredient)
    );
    expect(newState).toMatchObject(expectedResult);
  });
  test('addIngredientToBurgerConstructor принимает main', () => {
    const expectedResult = {
      ...initialState,
      ingredients: [mainConstructorIngredient]
    };
    const newState = burgerConstructorReducer(
      initialState,
      addIngredientToBurgerConstructor(mainConstructorIngredient)
    );
    expect(newState).toMatchObject(expectedResult);
  });
  test('addIngredientToBurgerConstructor принимает sauce', () => {
    const expectedResult = {
      ...initialState,
      ingredients: [sauceConstructorIngredient]
    };
    const newState = burgerConstructorReducer(
      initialState,
      addIngredientToBurgerConstructor(sauceConstructorIngredient)
    );
    expect(newState).toMatchObject(expectedResult);
  });
  test('deleteIngredientFromBurgerConstructor проверка удаления ингредиента', () => {
    const expectedResult = {
      ...filledInitialState,
      ingredients: [{ ...sauceConstructorIngredient, id: 'sauseId' }]
    };
    const newState = burgerConstructorReducer(
      filledInitialState,
      deleteIngredientFromBurgerConstructor('mainId')
    );
    expect(newState).toEqual(expectedResult);
  });
  test('changeIngredientLayer изменение позиции ингридиента', () => {
    const newState = burgerConstructorReducer(
      filledInitialState,
      changeIngredientLayer({ initialIndex: 0, finishIndex: 1 })
    );
    const expectedResult = {
      ...filledInitialState,
      ingredients: filledInitialState.ingredients.reverse()
    };
    expect(newState).toEqual(expectedResult);
  });
});
