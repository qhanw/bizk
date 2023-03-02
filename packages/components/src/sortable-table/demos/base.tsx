import { Table } from 'antd';
import { SortableTable } from '@bizk/components';
import { useState } from 'react';

const data = [
  { id: 1, name: 'Andy', age: 18 },
  { id: 2, name: 'Amy', age: 45 },
  { id: 3, name: 'Tom', age: 32 },
  { id: 4, name: 'Anna', age: 30 },
  { id: 5, name: 'Jue', age: 25 },
];

export default () => {
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
