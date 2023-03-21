import { describe, it, expect, vi } from 'vitest';
import { Store } from '..';

const store = new Store({ mode: 'local', crypto: true });

describe('localStorage', () => {
  it('test number of simulate expiration value', () => {
    vi.useFakeTimers();
    store.set('KEY_NUMBER', 1000, 5);

    vi.advanceTimersByTime(5000);

    expect(store.get('KEY_NUMBER')).toEqual(undefined);
  });

  it('test string', () => {
    store.set('KEY_STRING', '1000', 50);
    expect(store.get('KEY_STRING')).toEqual('1000');
  });

  it('test null', () => {
    store.set('KEY_NULL', null, 50);
    expect(store.get('KEY_NULL')).toEqual(null);
  });

  it('test undefined', () => {
    store.set('KEY_UNDEFINED', undefined, 50);
    expect(store.get('KEY_UNDEFINED')).toEqual(undefined);
  });

  it('test boolean', () => {
    store.set('KEY_BOOLEAN', true, 50);
    expect(store.get('KEY_BOOLEAN')).toEqual(true);
  });

  // TODO: 字符串类型的，未做验证

  it('test array', () => {
    const arr = [1, 2, 3, '4', '5'];

    store.set('KEY_ARRAY', arr, 50);
    expect(store.get('KEY_ARRAY')).toEqual(arr);
  });

  it('test object', () => {
    const obj = { a: 1, b: 2, c: '3' };

    store.set('KEY_OBJECT', obj, 50);
    expect(store.get('KEY_OBJECT')).toEqual(obj);
  });

  it('test JSON', () => {
    const json = [{ a: 1, b: 2, c: '3' }, { a: 11 }];

    store.set('KEY_JSON', json, 50);
    expect(store.get('KEY_JSON')).toEqual(json);
  });
});
