---
title: useTheadStretch(next)
group:
  title: 表格
  order: 1
---

# useTheadStretch(next)

开发中，用于替换旧的 useTheadStretch

### 代码演示

<code src="./demos/base.tsx" title="简单示例"></code>

## API

### Properties

| Name           | Type         | Default   | Description                                      |
| -------------- | ------------ | --------- | ------------------------------------------------ |
| columns        | ColumnType[] | undefined | antd table 的 columns                            |
| defaultWidth   | number       | 120       | 某一列不能拖动，设置该列的最小展示宽度，默认 120 |
| minConstraints | number       | 60        | 拖动最小宽度 默认 60                             |
| maxConstraints | number       | Infinity  | 拖动最大宽度 默认无穷                            |
| cache          | boolean      | true      | 是否缓存宽度，避免渲染重置拖拽宽度               |
| onResizeStart  | Function     | undefined | 开始拖拽时触发                                   |
| onResizeEnd    | Function     | undefined | 结束拖拽时触发                                   |

### Return

| Name       | Description                             |
| ---------- | --------------------------------------- |
| columns    | 拖拽 columns，用在 Table columns        |
| components | 拖拽 components， 用在 Table components |
| tableWidth | 表格宽度，用在 Table width              |
| reset      | 重置宽度方法                            |

### 注意事项

Ï
