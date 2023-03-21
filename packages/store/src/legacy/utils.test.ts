import { describe, it, expect } from 'vitest';
import { isFunction, isRegExp } from './utils';

describe('utils', () => {
  it('test isFunction', () => {
    expect(isFunction(() => {})).toEqual(true);
  });

  it('test isRegExp', () => {
    expect(isRegExp(/^abc/)).toEqual(true);
  });
});
