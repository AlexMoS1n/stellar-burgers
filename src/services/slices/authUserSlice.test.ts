import { expect, describe, test } from '@jest/globals';
import {
  authUserReducer,
  checkUserAuth,
  fetchGetUser,
  fetchLoginUser,
  fetchLogoutUser,
  fetchRegisterUser,
  fetchUpdateUser,
  initialState
} from './authUserSlice';

describe('проверка функциональности authUserReducer', () => {
  beforeAll(() => {
    global.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0
    };

    jest.mock('../../utils/cookie', () => ({
      setCookie: jest.fn(),
      getCookie: jest.fn(),
      deleteCookie: jest.fn()
    }));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  const mockLoginData = {
    email: 'jony-t@yandex.ru',
    password: '12345'
  };

  const mockRegisterData = {
    email: 'jony-t@yandex.ru',
    name: 'John Travolta',
    password: '12345'
  };

  const mockUserUpgradeData = {
    success: true,
    user: mockLoginData
  };

  test('Тест authUserReducer при fetchLoginUser в состоянии pending', () => {
    const action = { type: fetchLoginUser.pending.type };
    const expectedResult = {
      ...initialState,
      loginUserRequest: true
    };
    const newState = authUserReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест authUserReducer при fetchLoginUser в состоянии fulfilled', () => {
    const action = {
      type: fetchLoginUser.fulfilled.type,
      payload: mockLoginData
    };
    const expectedResult = {
      ...initialState,
      isAuthChecked: true,
      userData: mockLoginData
    };
    const newState = authUserReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест authUserReducer при fetchLoginUser в состоянии rejected', () => {
    const action = { type: fetchLoginUser.rejected.type };
    const expectedResult = {
      ...initialState,
      errorLogin: 'Ошибка в получении доступа к личному кабинету'
    };
    const newState = authUserReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест authUserReducer при fetchRegisterUser в состоянии pending', () => {
    const action = { type: fetchRegisterUser.pending.type };
    const expectedResult = {
      ...initialState,
      loginUserRequest: true
    };
    const newState = authUserReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест authUserReducer при fetchRegisterUser в состоянии fulfilled', () => {
    const action = {
      type: fetchRegisterUser.fulfilled.type,
      payload: mockRegisterData
    };
    const expectedResult = {
      ...initialState,
      isAuthChecked: true,
      userData: mockRegisterData
    };
    const newState = authUserReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест authUserReducer при fetchRegisterUser в состоянии rejected', () => {
    const action = { type: fetchRegisterUser.rejected.type };
    const expectedResult = {
      ...initialState,
      errorRegistration: 'Ошибка в регистристрации пользователя'
    };
    const newState = authUserReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест authUserReducer при fetchLogoutUser в состоянии pending', () => {
    const action = { type: fetchLogoutUser.pending.type };
    const expectedResult = {
      ...initialState,
      loginUserRequest: true
    };
    const newState = authUserReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест authUserReducer при fetchLogoutUser в состоянии fulfilled', () => {
    const action = { type: fetchLogoutUser.fulfilled.type };
    const newState = authUserReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
  test('Тест authUserReducer при fetchLogoutUser в состоянии rejected', () => {
    const action = { type: fetchLogoutUser.rejected.type };
    const expectedResult = {
      ...initialState,
      errorLogout: 'Ошибка выхода из аккаунта пользователя'
    };
    const newState = authUserReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест authUserReducer при fetchUpdateUser в состоянии pending', () => {
    const action = { type: fetchUpdateUser.pending.type };
    const expectedResult = {
      ...initialState,
      loginUserRequest: true
    };
    const newState = authUserReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест authUserReducer при fetchUpdateUser в состоянии fulfilled', () => {
    const action = {
      type: fetchUpdateUser.fulfilled.type,
      payload: mockUserUpgradeData
    };
    const expectedResult = {
      ...initialState,
      isAuthChecked: true,
      userData: mockUserUpgradeData.user
    };
    const newState = authUserReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест authUserReducer при fetchUpdateUser в состоянии rejected', () => {
    const action = { type: fetchUpdateUser.rejected.type };
    const expectedResult = {
      ...initialState,
      errorUpdate: 'Ошибка в обновлении данных пользователя'
    };
    const newState = authUserReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Тест authUserReducer при checkUserAuth в состоянии pending', () => {
    const action = { type: checkUserAuth.pending.type };
    const newState = authUserReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
  test('Тест authUserReducer при fetchGetUser в состоянии fulfilled', () => {
    const action = {
      type: fetchGetUser.fulfilled.type,
      payload: mockUserUpgradeData
    };
    const newState = authUserReducer(initialState, action);
    const expectedResult = {
      ...initialState,
      userData: mockUserUpgradeData.user
    };
    expect(newState).toEqual(expectedResult);
  });
});
