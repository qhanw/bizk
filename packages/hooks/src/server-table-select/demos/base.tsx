import { ProTable } from '@ant-design/pro-components';
import { useServerTableSelect } from '@bizk/hooks';
import { Button } from 'antd';
import { useState } from 'react';

const data = (() => {
  const d = [];

  const names = ['Andy', 'Amy', 'Tom', 'Anna', 'Jue'];

  for (let i = 0; i < 50; i += 1) {
    d.push({
      id: i + 1,
      name: i > 4 ? `${names[i % 5]}-${i}` : names[i],
      age: Math.floor(Math.random() * 100),
    });
  }

  return d;
})();

const fetchList = (params?: any) => {
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
    }, 1000);
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
