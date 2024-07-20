import { rootReducer } from './rootReducer';
import store from './store';
import { expect, describe, test } from '@jest/globals';

describe('Проверка правильной инициализацию rootReducer', () => {
  test('тест, проверяющий правильную настройку и работу rootReducer', () => {
    const anotherState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(anotherState);
  });
});
