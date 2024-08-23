import { Table } from 'antd';
import { SortableTable } from '@bizk/components';
import { useState } from 'react';

const data = [
  { uid: 1, name: 'Andy', age: 18 },
  { uid: 2, name: 'Amy', age: 45 },
  { uid: 3, name: 'Tom', age: 32 },
  { uid: 4, name: 'Anna', age: 30 },
  { uid: 5, name: 'Jue', age: 25 },
];

export default () => {
  const [dataSource, setDataSource] = useState(data);

  const columns = [
    { title: 'order', dataIndex: 'uid' },
    { title: 'name', dataIndex: 'name' },
    { title: 'age', dataIndex: 'age' },
  ];

  return (
    <SortableTable onChange={(d: any) => setDataSource(d)}>
      <Table rowKey="uid" columns={columns} dataSource={dataSource} />
    </SortableTable>
  );
};
