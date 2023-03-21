import { describe, it, expect } from 'vitest';
import { Store } from '..';

const store = new Store({ mode: 'local', crypto: false });

describe('localStorage', () => {
  it('test number', () => {
    store.set('KEY_NUMBER', 1000);
    expect(store.get('KEY_NUMBER')).toEqual(1000);
  });

  it('test string', () => {
    store.set('KEY_STRING', '1000');
    expect(store.get('KEY_STRING')).toEqual(1000);
  });

  it('test null', () => {
    store.set('KEY_NULL', null);
    expect(store.get('KEY_NULL')).toEqual(undefined);
  });

  it('test undefined', () => {
    store.set('KEY_UNDEFINED', undefined);
    expect(store.get('KEY_UNDEFINED')).toEqual('undefined');
  });

  it('test boolean', () => {
    store.set('KEY_BOOLEAN', true);
    expect(store.get('KEY_BOOLEAN')).toEqual(true);
  });

  // TODO: 字符串类型的，未做验证

  it('test array', () => {
    const arr = [1, 2, 3, '4', '5'];

    store.set('KEY_ARRAY', arr);
    expect(store.get('KEY_ARRAY')).toEqual(arr);
  });

  it('test object', () => {
    const obj = { a: 1, b: 2, c: '3' };

    store.set('KEY_OBJECT', obj);
    expect(store.get('KEY_OBJECT')).toEqual(obj);
  });

  it('test JSON', () => {
    const json = [{ a: 1, b: 2, c: '3' }, { a: 11 }];

    store.set('KEY_JSON', json);
    expect(store.get('KEY_JSON')).toEqual(json);
  });
});
