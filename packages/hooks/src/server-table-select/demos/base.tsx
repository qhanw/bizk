import { ProTable } from '@ant-design/pro-components';
import { useServerTableSelect } from '@bizk/hooks';
import { Button } from 'antd';
import { useState } from 'react';

const data = [
  { id: 1, name: 'Andy', age: 18 },
  { id: 2, name: 'Amy', age: 45 },
  { id: 3, name: 'Tom', age: 32 },
  { id: 4, name: 'Anna', age: 30 },
  { id: 5, name: 'Jue', age: 25 },
];

const fetchList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: false,
        data: { wholeOperationNum: 100, items: data, totalNum: 5 },
      });
    }, 2000);
  });
};

type TableItem = { id: number; name: string; age: number };

export default () => {
  const [query, setQuery] = useState<Record<string, any>>();
  const columns = [
    { title: 'order', dataIndex: 'id' },
    { title: 'name', dataIndex: 'name' },
    { title: 'age', dataIndex: 'age' },
  ];

  const { selectedInfo, resetSelection, takeQueryParams, options } =
    useServerTableSelect<TableItem>({
      request: fetchList,
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
