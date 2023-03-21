import { describe, expect, test } from 'vitest';
import { phone } from '..';

describe('mobile phone regexp', () => {
  test('合格的手机号', () => {
    expect(phone.test('13555555555')).toEqual(true);
  });

  test('非法区间手机号', () => {
    expect(phone.test('17911111111')).toEqual(false);
  });

  test('国际编码', () => {
    expect(phone.test('8613333333333')).toEqual(true);
  });

  test('存在非法字符', () => {
    expect(phone.test('1355555555XX')).toEqual(false);
  });

  test('字符非11位手机号', () => {
    expect(phone.test('1333333')).toEqual(false);
  });
});
