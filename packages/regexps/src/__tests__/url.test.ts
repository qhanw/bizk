import { describe, expect, test } from 'vitest';
import { url } from '..';

describe('url regexp', () => {
  test('normal url', () => {
    expect(url.test('baidu.com')).toEqual(true);
  });

  test('url with www', () => {
    expect(url.test('www.baidu.com')).toEqual(true);
  });

  test('url with http', () => {
    expect(url.test('http://baidu.com')).toEqual(true);
  });

  test('directory url', () => {
    expect(url.test('http://baidu.com/xx')).toEqual(true);
  });
});
