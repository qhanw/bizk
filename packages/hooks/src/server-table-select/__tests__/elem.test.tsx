import { describe, expect, it, afterEach } from 'vitest';
import { render, cleanup, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useServerTableSelect from '..';

import { useState } from 'react';
import { Button } from 'antd';
import { ProTable } from '@ant-design/pro-components';

const data = [
  { id: 1, name: 'Andy', age: 18 },
  { id: 2, name: 'Amy', age: 45 },
  { id: 3, name: 'Tom', age: 32 },
  { id: 4, name: 'Anna', age: 30 },
  { id: 5, name: 'Jue', age: 25 },
];

const columns = [
  { title: 'order', dataIndex: 'id' },
  { title: 'name', dataIndex: 'name' },
  { title: 'age', dataIndex: 'age' },
];

type TableItem = { id: number; name: string; age: number };

const fetchSuccessList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: { wholeOperationNum: 100, items: data, totalNum: 5 },
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

const TestTable = ({ fetch }: { fetch: () => Promise<any> }) => {
  const [query, setQuery] = useState<Record<string, any>>();

  const { selectedInfo, resetSelection, takeQueryParams, options } =
    useServerTableSelect<TableItem>({
      request: fetch,
      rowKey: 'id',
    });

  return (
    <>
      <ProTable<TableItem> columns={columns} {...options} />
      <Button
        onClick={async () => {
          const qs = await takeQueryParams();
          setQuery(qs);
        }}
      >
        获取查询参数
      </Button>
      <Button onClick={() => resetSelection()}>重置全选</Button>
      <div>选中数据信息：{JSON.stringify(selectedInfo)}</div>

      <div>
        <div>查询参数：{JSON.stringify(query) || '-'}</div>
      </div>
    </>
  );
};

describe('test using useServerTableSelect hooks in components', () => {
  // Default on import: runs it after each test.
  afterEach(() => {
    cleanup();
  });

  it('request successful', async () => {
    const inst = render(<TestTable fetch={fetchSuccessList} />);

    expect(inst.getByText('查 询')).toBeTruthy();

    await waitFor(
      async () => {
        expect(inst.queryByText('Anna')).toBeTruthy();
      },
      { timeout: 600 },
    );
  });

  it('request failed', async () => {
    const inst = render(<TestTable fetch={fetchFailedList} />);

    expect(inst.getByText('查 询')).toBeTruthy();

    await waitFor(
      async () => {
        expect(inst.queryByText('Anna')).toBeFalsy();
      },
      { timeout: 600 },
    );
  });

  // it('selected all', async () => {
  //   const inst = render(<TestTable fetch={fetchSuccessList} />);

  //   expect(inst.getByText('查 询')).toBeTruthy();

  //   await waitFor(
  //     async () => {
  //       await userEvent.hover(
  //         inst.container.querySelector('span[aria-label="down"]')!,
  //       );

  //       expect(screen.queryByText('全部')).toBeTruthy();

  //       // userEvent.click(inst.getByText('全部'));

  //       // expect(inst.getByText('已选择 100 项')).toBeTruthy();

  //       // expect(inst.getByText('Anna')).toBeTruthy();
  //     },
  //     { timeout: 600 },
  //   );
  // });
});
