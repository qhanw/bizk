import { describe, expect, test } from 'vitest';
import { ip } from '..';

describe('url regexp', () => {
  test('minimum ip', () => {
    expect(ip.test('0.0.0.0')).toEqual(true);
  });

  test('maximum ip', () => {
    expect(ip.test('255.255.255.255')).toEqual(true);
  });

  test('lan ip', () => {
    expect(ip.test('192.168.0.1')).toEqual(true);
  });

  test('out of range', () => {
    expect(ip.test('255.255.255.256')).toEqual(false);
  });

  test('unexpected character', () => {
    expect(ip.test('255.255.255.25x')).toEqual(false);
  });
});
