---
title: useTheadStretch
group:
  title: 表格
  order: 1
---

# useTheadStretch

> fork: https://github.com/hemengke1997/use-antd-resizable-header

antd 表格头拖拽 Hook，兼容 Table ProTable。目前功能均出自[@minko-fe/use-antd-resizable-header](https://github.com/hemengke1997/use-antd-resizable-header), 由于该库主要以`umd`方式构建，导致在项目使用中需同时导入`@minko-fe/use-antd-resizable-header/index.css`于开发中不是很方便，因此当前版本直接拷贝后并重新配置构建方式，并扩展部分 API 以适用于项目应用。

### 缺陷

- 目前底层实现上使用`react-resizable`作为拖拽处理
- 当前实现原理为计算表格`column`的宽度属性，因此会对表格作出更新，性能有待考量

### 规划

为统一技术栈后续在此基础上逐步用`dnd-kit`替换`react-resizable`实现表头伸缩。同时采用直接操作 DOM 的方式实现表头宽度定义。

### 代码演示

<code src="./demos/example.tsx" title="简单示例"></code>

<code src="./demos/complex.tsx" title="复杂示例"></code>

```css
/* index.css */
--arh-color: red;
```

<code src="./demos/base.tsx" title="基本用例"></code>

## API

### Properties

| Name           | Type             | Default   | Description                                      |
| -------------- | ---------------- | --------- | ------------------------------------------------ |
| columns        | ColumnType[]     | undefined | antd table 的 columns                            |
| defaultWidth   | number           | 120       | 某一列不能拖动，设置该列的最小展示宽度，默认 120 |
| minConstraints | number           | 60        | 拖动最小宽度 默认 60                             |
| maxConstraints | number           | Infinity  | 拖动最大宽度 默认无穷                            |
| cache          | boolean          | true      | 是否缓存宽度，避免渲染重置拖拽宽度               |
| columnsState   | ColumnsStateType | undefined | 列状态的配置，可以用来操作列拖拽宽度             |
| onResizeStart  | Function         | undefined | 开始拖拽时触发                                   |
| onResizeEnd    | Function         | undefined | 结束拖拽时触发                                   |

### Return

| Name             | Description                             |
| ---------------- | --------------------------------------- |
| resizableColumns | 拖拽 columns，用在 Table columns        |
| components       | 拖拽 components， 用在 Table components |
| tableWidth       | 表格宽度，用在 Table width              |
| resetColumns     | 重置宽度方法                            |

### 注意事项

- 默认拖动颜色为`#000`，可通过`global`或设置 css 变量`--arh-color`设置颜色
- 至少一列不能拖动（width 不设置即可），[请保持至少一列的自适应](https://ant-design.gitee.io/components/table-cn/#components-table-demo-fixed-columns)
- 若 column 未传入`dataIndex`，请传入一个唯一的`key`，否则按照将按照 column 的序号 index 计算唯一 key
- 若 column 有副作用，请把依赖项传入 useMemo deps 中
- remember import style

### 为什么需要 React.useMemo ?

如果不使用 useMemo
组件 render => columns 引用变化 => use-antd-resiable-header render => 组件 render => columns 引用变化···

### 不使用 useMemo

可以采用其他阻止 render 的方案，如: `columns` 是 prop 或 组件外常量

### Table 特殊处理

- filter 按钮溢出隐藏
  解决方案：
  ```css
  .ant-table-filter-trigger {
    margin-inline: 0;
  }
  ```

### ProTable 特殊处理

- fixed
  [ProTable 默认会给 fixed 列添加宽度](https://github.com/ant-design/pro-components/blob/master/packages/table/src/utils/genProColumnToColumn.tsx#L115-L116)，所以可能会造成 `至少一列宽度为0` 的条件无法满足。
  解决方案：
  1. 手动给 fixed 列添加宽度，然后不设置其余某一个非 fixed 列宽度
  2. 不设置 fixed 列宽度（默认 200），然后其余某一列也不设置宽度
