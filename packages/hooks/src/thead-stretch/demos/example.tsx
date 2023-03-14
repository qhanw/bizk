import { useMemo } from 'react';
import { Button, Table, Space } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { useTheadStretch } from '@bizk/hooks';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

export default () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      ellipsis: true,
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
      width: 200,
    },

    {
      title: 'render',
      key: 'action',
      render: (text: any, record: any) => <a>Invite {record.name}</a>,
    },
  ];

  const { components, resizableColumns, tableWidth, resetColumns } =
    useTheadStretch({
      columns: useMemo(() => columns, []),
      // 保存拖拽宽度至本地localStorage
      columnsState: {
        persistenceKey: 'localKey',
        persistenceType: 'localStorage',
      },
    });

  return (
    <>
      <Table
        columns={resizableColumns}
        components={components}
        dataSource={data}
        scroll={{ x: tableWidth }}
      />
      <ProTable
        columns={resizableColumns}
        components={components}
        dataSource={data}
        scroll={{ x: tableWidth }}
      />
      <Button onClick={() => resetColumns()}>重置宽度</Button>
    </>
  );
};
