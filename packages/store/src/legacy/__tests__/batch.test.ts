import { describe, it, expect } from 'vitest';
import { Store } from '..';

const store = new Store({ mode: 'local', crypto: true, expire: 50 });

describe('localStorage', () => {
  it('test a set of data', () => {
    store.setAll({
      a: 1,
      b: 2,
      c: 3,
    });
    expect(store.get(['a', 'b', 'c'])).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });

  it('test clear storage', () => {
    store.setAll({
      a: 1,
      b: 2,
      c: 3,
    });

    store.clear();
    expect(store.get('a')).toEqual(undefined);
  });

  it('test del one or more data', () => {
    store.setAll({
      a: 1,
      b: 2,
      c: 3,
    });

    store.del('a');
    expect(store.get('a')).toEqual(undefined);

    store.del(['b', 'c']);
    expect(store.get('b')).toEqual(undefined);
    expect(store.get('c')).toEqual(undefined);
  });
});
