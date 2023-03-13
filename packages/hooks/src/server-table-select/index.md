---
title: useServerTableSelect
group:
  title: Common
  order: -1
demo:
  cols: 2
---

# useServerTableSelect

后端表格全选 hooks，适用于`ProTable`组件，通过对`ProTable`组件属性进行扩展，实现服务端全选操作。

### 代码演示

<code src="./demos/base.tsx" ></code>

### API

```tsx | pure
const {
  selectedInfo,
  resetSelection,
  takeQueryParams,
  options
} = useServerTableSelect<T,U>({
  authKey?: string,
  rowKey: string | (row:T)=> string,
  request: (...args: U) => Promise<T[]>,,
  adapterParams: (params:Record<stringify,any>, sort:Record<stringify,any>)=> Record<stringify,any>
});
```

#### Result

| 参数            | 说明             | 类型                                          | 默认值 |
| :-------------- | :--------------- | :-------------------------------------------- | :----- |
| selectedInfo    | 选择数据信息     | [SelectedInfo](#selectedinfo)                 | -      |
| resetSelection  | 重置全选状态     | () => void;                                   | -      |
| takeQueryParams | 取出查询参数集合 | () => void;                                   | -      |
| options         | 表格属属         | (Partial<Omit<ProTableProps<T, U>, 'column'>> | -      |

#### Options

其它配置参数请查阅[ProTableProps](https://procomponents.ant.design/components/table?current=1&pageSize=5#protable)

| 参数          | 说明             | 类型                                         | 默认值                                 |
| :------------ | :--------------- | :------------------------------------------- | :------------------------------------- |
| request       | 表格数据请求 API | (params: U, authKey: string) => Promise<any> | -                                      |
| adapterParams | 处理查询参数     | (params: any, sorter: any) => any            | -                                      |
| batchParams   | 批量操作参数配置 | Record<string, any>                          | { includes: string; excludes: string } |
| disabledRow   | 禁用表格行       | (record: any) => boolean                     | -                                      |
| authKey       | 权限 Key         | string                                       | -                                      |

#### SelectedInfo

| 参数            | 说明               | 类型                           | 默认值    |
| :-------------- | :----------------- | :----------------------------- | :-------- |
| type            | 选择类型           | 'all'\| 'current' \| undefined | undefined |
| finishedTotal   | 服务端可选择总数目 | number                         | -         |
| selectedRowKeys | 已选择 key 的集合  | React.Key[]                    | -         |
| selected        | 是否已选择         | boolean                        | -         |
| selectedTotal   | 已选择总数目       | number                         | -         |
