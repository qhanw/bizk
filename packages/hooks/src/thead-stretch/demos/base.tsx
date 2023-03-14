import { useReducer, useState, useMemo } from 'react';
import { Space, Table, Tag } from 'antd';
import { useTheadStretch } from '@bizk/hooks';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default () => {
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const [deps, setDeps] = useState(0);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      ellipsis: true,
      render: (text: any) => (
        <a onClick={() => setDeps((t) => t + 1)}>
          {text}
          {deps}
        </a>
      ),
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
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      width: 200,
      ellipsis: true,
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'render',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a
            onClick={() => {
              forceRender();
              alert('render');
            }}
          >
            render
          </a>
        </Space>
      ),
    },
  ];

  const { components, resizableColumns, tableWidth } = useTheadStretch({
    columns: useMemo(() => columns, [deps]),
    minConstraints: 50,
  });

  return (
    <Table
      columns={resizableColumns}
      components={components}
      dataSource={data}
      scroll={{ x: tableWidth }}
    />
  );
};
