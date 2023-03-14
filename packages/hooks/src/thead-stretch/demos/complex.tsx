import { useMemo, useReducer } from 'react';
import { Table } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { useTheadStretch } from '@bizk/hooks';

const tcls: any[] = [
  {
    title: '333',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'John',
        value: 'John',
      },
    ],
    onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 150,
        sorter: (a: any, b: any) => a.age - b.age,
      },
      {
        title: 'Address',
        children: [
          {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 150,
          },
          {
            title: 'Block',
            children: [
              {
                title: 'Building',
                dataIndex: 'building',
                key: 'building',
                width: 100,
              },
              {
                title: 'Door No.',
                dataIndex: 'number',
                key: 'number',
                width: 100,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 200,
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
      },
    ],
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: 80,
    fixed: 'right',
  },
];

const data: any[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  });
}

export default () => {
  const [x, setX] = useReducer((s) => s + 1, 0);

  const { components, resizableColumns, tableWidth } = useTheadStretch({
    columns: tcls,
    columnsState: {
      persistenceType: 'localStorage',
      persistenceKey: 'test',
    },
  });

  const proColumns = useMemo(
    () => [
      {
        title: 'Pro-Name',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
      },
      {
        title: 'Age',
        width: 100,
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'x',
        width: 100,
        dataIndex: 'x',
        key: 'x',
      },
      {
        title: 'y',
        width: 100,
        dataIndex: 'y',
        key: 'y',
      },
      {
        title: 'Column 1',
        dataIndex: 'address',
      },
      {
        title: 'test render',
        dataIndex: 'testRender',
        width: 111,
        render: () => {
          return <div onClick={() => setX()}>{x}</div>;
        },
      },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        render: (_: any, record: any) => {
          return <span>{record?.age}</span>;
        },
        width: 100,
      },
    ],
    [x],
  );

  const {
    components: cp,
    resizableColumns: rp,
    tableWidth: tp,
  } = useTheadStretch({
    columns: proColumns,
    defaultWidth: 444,
    columnsState: {
      persistenceType: 'localStorage',
      persistenceKey: 'fds',
    },
  });

  return (
    <div className="App">
      <Table
        columns={resizableColumns}
        components={components}
        dataSource={data}
        scroll={{ x: tableWidth }}
      />

      <ProTable
        columns={rp}
        components={cp}
        dataSource={data}
        scroll={{ x: tp }}
      />
    </div>
  );
};
