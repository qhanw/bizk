/**
 * @jest-environment jsdom
 */

import { Store } from '.';

const local = new Store({ mode: 'local', crypto: false });

describe('localStorage', () => {
  it('test number', () => {
    local.set('KEY_NUMBER', 1000);
    expect(local.get('KEY_NUMBER')).toEqual(1000);
  });

  it('test string', () => {
    local.set('KEY_STRING', '1000');
    expect(local.get('KEY_STRING')).toEqual(1000);
  });

  it('test null', () => {
    local.set('KEY_NULL', null);
    expect(local.get('KEY_NULL')).toEqual(null);
  });

  it('test undefined', () => {
    local.set('KEY_UNDEFINED', undefined);
    expect(local.get('KEY_UNDEFINED')).toEqual("undefined");
  });

  it('test boolean', () => {
    local.set('KEY_BOOLEAN', true);
    expect(local.get('KEY_BOOLEAN')).toEqual(true);
  });

  // TODO: 字符串类型的，未做验证

  it('test array', () => {
    const arr = [1, 2, 3, '4', '5'];

    local.set('KEY_ARRAY', arr);
    expect(local.get('KEY_ARRAY')).toEqual(arr);
  });

  it('test object', () => {
    const obj = { a: 1, b: 2, c: '3' };

    local.set('KEY_OBJECT', obj);
    expect(local.get('KEY_OBJECT')).toEqual(obj);
  });

  it('test JSON', () => {
    const json = [{ a: 1, b: 2, c: '3' }, { a: 11 }];

    local.set('KEY_JSON', json);
    expect(local.get('KEY_JSON')).toEqual(json);
  });
});
