import { describe, expect, test } from 'vitest';
import { email } from '..';

describe('email regexp', () => {
  test('合格的邮箱', () => {
    expect(email.test('xx@xx.cn')).toEqual(true);
  });

  test('错误的邮箱', () => {
    expect(email.test('xx@xx')).toEqual(false);
  });

  test('缺失@符号', () => {
    expect(email.test('xxx.xx')).toEqual(false);
  });
});
