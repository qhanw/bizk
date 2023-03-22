import { describe, expect, it, afterEach } from 'vitest';
import { renderHook, cleanup } from '@testing-library/react';
import useServerTableSelect from '..';

describe('test useServerTableSelect', () => {
  // Default on import: runs it after each test.
  afterEach(() => {
    cleanup();
  });

  it('test whether the return value of the tick is correct', async () => {
    const {
      result: {
        current: { options, takeQueryParams, selectedInfo },
      },
    } = renderHook(() =>
      useServerTableSelect({
        rowKey: 'testKey',
        request: async () => {},
        adapterParams: () => ({ a: 1 }),
      }),
    );

    expect(options.rowKey).toBe('testKey');

    // 返回是否是函数且参数是否是两个
    expect(options.request?.length).toBe(2);
    // 全选配置宽度
    expect(options.rowSelection).toMatchObject({ columnWidth: 48 });

    const q = await takeQueryParams();

    expect(q).toEqual({
      selectedTotal: 0,
      type: '0',
      includes: [],
      condition: {},
    });

    expect(selectedInfo).toEqual({
      type: undefined,
      selectableTotal: 0,
      selectedRowKeys: [],
      selected: false,
      selectedTotal: 0,
    });
  });
});
