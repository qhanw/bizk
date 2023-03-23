import { describe, expect, it, afterEach, vi, beforeEach } from 'vitest';
import {
  render,
  cleanup,
  screen,
  act,
  fireEvent,
} from '@testing-library/react';

import useServerTableSelect from '..';

import { useState } from 'react';
import { Button } from 'antd';
import { ProTable } from '@ant-design/pro-components';

const data = (() => {
  const d = [];

  const names = ['Andy', 'Amy', 'Tom', 'Anna', 'Jue'];

  for (let i = 0; i < 50; i += 1) {
    d.push({
      id: `${i + 1}`,
      name: i > 4 ? `${names[i % 5]}-${i}` : names[i],
      age: Math.floor(Math.random() * 100),
    });
  }

  return d;
})();

const columns = [
  { title: 'order', dataIndex: 'id' },
  { title: 'name', dataIndex: 'name' },
  { title: 'age', dataIndex: 'age' },
];

type TableItem = { id: number; name: string; age: number };

const fetchAllList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: { wholeOperationNum: 100, items: data, totalNum: data.length },
      });
    }, 500);
  });
};

const fetchSuccessList = (params?: any) => {
  const { current, pageSize } = params;
  const cursor = (current - 1) * pageSize;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          wholeOperationNum: 100,
          items: data.slice(cursor, cursor + pageSize),
          totalNum: data.length,
        },
      });
    }, 500);
  });
};

const fetchFailedList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: false, data: {} });
    }, 500);
  });
};

const TestTable = ({
  fetch,
  pagination,
}: {
  fetch: () => Promise<any>;
  pagination?: false;
}) => {
  const [query, setQuery] = useState<Record<string, any>>();

  const { selectedInfo, resetSelection, takeQueryParams, options } =
    useServerTableSelect<TableItem>({
      request: fetch,
      rowKey: 'id',
      pagination,
    });

  return (
    <>
      <ProTable<TableItem> columns={columns} {...options} search={false} />
      <Button
        onClick={async () => {
          const qs = await takeQueryParams();
          setQuery(qs);
        }}
      >
        获取查询参数
      </Button>
      <Button onClick={() => resetSelection()}>重置选选</Button>
      <div>选中数据信息：{JSON.stringify(selectedInfo)}</div>

      <div>
        <div>查询参数：{JSON.stringify(query) || '-'}</div>
      </div>
    </>
  );
};

// export async function waitFakeTimer(advanceTime = 1000, times = 20) {
//   for (let i = 0; i < times; i += 1) {
//     // eslint-disable-next-line no-await-in-loop
//     await act(async () => {
//       await Promise.resolve();

//       if (advanceTime > 0) {
//         vi.advanceTimersByTime(advanceTime);
//       } else {
//         vi.runAllTimers();
//       }
//     });
//   }
// }

describe('test using useServerTableSelect hooks in components', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  // Default on import: runs it after each test.
  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
    cleanup();
  });

  it('request successful', async () => {
    const inst = render(<TestTable fetch={fetchSuccessList} />);

    expect(inst.getByText('order')).toBeTruthy();

    await act(() => vi.runAllTimersAsync());

    expect(inst.queryByText('Anna')).toBeTruthy();
  });

  it('request successful without pagination', async () => {
    const { container, getByText } = render(
      <TestTable fetch={fetchAllList} pagination={false} />,
    );

    expect(getByText('order')).toBeTruthy();

    await act(() => vi.runAllTimersAsync());

    expect(container.querySelector('.pagination')).toBeNull();
  });

  it('request failed', async () => {
    const inst = render(<TestTable fetch={fetchFailedList} />);

    expect(inst.getByText('order')).toBeTruthy();

    await act(() => vi.runAllTimersAsync());

    expect(inst.queryByText('Anna')).toBeFalsy();
  });

  it('selected all', async () => {
    const { container } = render(<TestTable fetch={fetchSuccessList} />);

    const selectorPrefix = '.ant-table-selection-extra .ant-dropdown-';

    await act(() => vi.runAllTimersAsync());

    fireEvent.mouseEnter(container.querySelector(`${selectorPrefix}trigger`)!);

    await act(() => vi.runAllTimersAsync());

    expect(container.querySelector(`${selectorPrefix}open`)).toBeTruthy();

    expect(screen.queryByText('全部')).toBeTruthy();

    fireEvent.click(screen.queryByText('全部')!);

    expect(screen.queryByText('取消选择')).toBeTruthy();
  });

  it('select current page', async () => {
    const { container } = render(<TestTable fetch={fetchSuccessList} />);

    const selectorPrefix = '.ant-table-selection-extra .ant-dropdown-';

    await act(() => vi.runAllTimersAsync());

    fireEvent.mouseEnter(container.querySelector(`${selectorPrefix}trigger`)!);

    await act(() => vi.runAllTimersAsync());

    fireEvent.click(screen.queryByText('当前页')!);

    expect(screen.queryByText('已选择 10 项')?.innerHTML).toBeTruthy();
  });

  it('selected all and then deselect some', async () => {
    const { container } = render(<TestTable fetch={fetchSuccessList} />);

    const selectorPrefix = '.ant-table-selection-extra .ant-dropdown-';

    await act(() => vi.runAllTimersAsync());

    fireEvent.mouseEnter(container.querySelector(`${selectorPrefix}trigger`)!);

    await act(() => vi.runAllTimersAsync());

    fireEvent.click(screen.queryByText('全部')!);

    fireEvent.click(
      container.querySelectorAll('label.ant-checkbox-wrapper')[3],
    );

    expect(screen.queryByText('已选择 99 项')).toBeTruthy();
  });

  it('select current page and then deselect some', async () => {
    const { container } = render(<TestTable fetch={fetchSuccessList} />);

    const selectorPrefix = '.ant-table-selection-extra .ant-dropdown-';

    await act(() => vi.runAllTimersAsync());

    fireEvent.mouseEnter(container.querySelector(`${selectorPrefix}trigger`)!);

    await act(() => vi.runAllTimersAsync());

    fireEvent.click(screen.queryByText('当前页')!);
    fireEvent.click(
      container.querySelectorAll('label.ant-checkbox-wrapper')[3],
    );

    expect(screen.queryByText('已选择 9 项')).toBeTruthy();
  });

  it('select current page and then reset selection', async () => {
    const { container } = render(<TestTable fetch={fetchSuccessList} />);

    const selectorPrefix = '.ant-table-selection-extra .ant-dropdown-';

    await act(() => vi.runAllTimersAsync());

    fireEvent.mouseEnter(container.querySelector(`${selectorPrefix}trigger`)!);

    await act(() => vi.runAllTimersAsync());

    fireEvent.click(screen.queryByText('当前页')!);
    fireEvent.click(screen.queryByText('重置选选')!);

    expect(screen.queryByText('取消选择')).toBeNull();
  });

  it('select all and then jump to page 2', async () => {
    const { container } = render(<TestTable fetch={fetchSuccessList} />);

    const selectorPrefix = '.ant-table-selection-extra .ant-dropdown-';

    await act(() => vi.runAllTimersAsync());

    fireEvent.mouseEnter(container.querySelector(`${selectorPrefix}trigger`)!);

    await act(() => vi.runAllTimersAsync());

    fireEvent.click(screen.queryByText('全部')!);
    fireEvent.click(
      container.querySelectorAll('label.ant-checkbox-wrapper')[3],
    );

    fireEvent.click(container.querySelector('.ant-pagination-next')!);

    await act(() => vi.runAllTimersAsync());

    expect(
      container.querySelector('.ant-pagination-item-active a')?.innerHTML,
    ).toEqual('2');
  });
});
