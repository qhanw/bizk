import { describe, expect, test } from 'vitest';
import { bankCard, uscc, postcode } from '..';

describe('bank card regexp', () => {
  test('合格的银行卡', () => {
    expect(bankCard.test('6222222222222222222')).toEqual(true);
  });

  test('错误的银行卡', () => {
    expect(bankCard.test('77777777777777')).toEqual(false);
  });
});

describe('uscc regexp', () => {
  test('合格的统一社会信用代码', () => {
    expect(uscc.test('91440101MA5AM00L7B')).toEqual(true);
  });

  test('错误的统一社会信用代码', () => {
    expect(uscc.test('91440101MA5AM00L7Bx')).toEqual(false);
  });
});

describe('postcode regexp', () => {
  test('合格的邮编', () => {
    expect(postcode.test('610000')).toEqual(true);
  });

  test('错误的邮编', () => {
    expect(postcode.test('6133330')).toEqual(false);
  });
});
