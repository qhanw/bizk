import { describe, expect, it, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Table } from 'antd';

import { useState } from 'react';

const data = [
  { id: 1, name: 'Andy', age: 18 },
  { id: 2, name: 'Amy', age: 45 },
  { id: 3, name: 'Tom', age: 32 },
  { id: 4, name: 'Anna', age: 30 },
  { id: 5, name: 'Jue', age: 25 },
];

import SortableTable from '../';

describe('suite SortableTable', () => {
  // Default on import: runs it after each test.
  afterEach(() => {
    cleanup();
  });

  it('renders SortableTable component', () => {
    const STable = () => {
      const [dataSource, setDataSource] = useState(data);

      const columns = [
        { title: 'order', dataIndex: 'id' },
        { title: 'name', dataIndex: 'name' },
        { title: 'age', dataIndex: 'age' },
      ];

      return (
        <SortableTable onChange={(d: any) => setDataSource(d)}>
          <Table rowKey="id" columns={columns} dataSource={dataSource} />
        </SortableTable>
      );
    };

    render(<STable />);

    expect(screen.getByText('order')).toBeTruthy();
  });

  it('drag and sort', async () => {
    const STable = () => {
      const [dataSource, setDataSource] = useState(data);

      const columns = [
        { title: 'order', dataIndex: 'id' },
        { title: 'name', dataIndex: 'name' },
        { title: 'age', dataIndex: 'age' },
      ];

      return (
        <SortableTable onChange={(d: any) => setDataSource(d)}>
          <Table rowKey="id" columns={columns} dataSource={dataSource} />
        </SortableTable>
      );
    };

    const { container } = render(<STable />);

    // 第一次渲染，检验单元格值
    expect(screen.getAllByText(/^[1|2]$/)[0].innerHTML).toContainEqual('1');

    const menu = container.querySelectorAll("[aria-label='menu']");

    //  开始拖拽移动元素
    await userEvent.pointer([
      { keys: '[TouchA>]', target: menu[0] },
      { pointerName: 'TouchA', target: menu[1] },
      { keys: '[/TouchA]' },
    ]);

    // 是否正确移动， 检验单元格值
    expect(screen.getAllByText(/^[1|2]$/)[0].innerHTML).toContainEqual('2');
  });

  it('drag and sort without data', async () => {
    const STable = () => {
      const [dataSource, setDataSource] = useState([]);

      const columns = [
        { title: 'order', dataIndex: 'id' },
        { title: 'name', dataIndex: 'name' },
        { title: 'age', dataIndex: 'age' },
      ];

      return (
        <SortableTable onChange={(d: any) => setDataSource(d)}>
          <Table rowKey="id" columns={columns} dataSource={dataSource} />
        </SortableTable>
      );
    };

    const { container } = render(<STable />);

    const menu = container.querySelector("[aria-label='menu']");

    expect(menu).toBeFalsy();
  });
});
