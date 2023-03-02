---
title: BackEndSelectAllTable
group:
  title: 表格
  order: 1
demo:
  cols: 2
---

# BackEndSelectAllTable

后端全选组件，剔除现 CheckTable 中 ProTable，提供一个容器包裹组件

### 代码演示

<!-- <code src="./demos/base.tsx"  title="基本使用" ></code>
<code src="./demos/target.tsx"  title="新标签页打开"></code>
<code src="./demos/click.tsx"  title="Js 事件点击"></code>
<code src="./demos/to.tsx"  title="React Router To"></code> -->

### API

由于`ALink` 组件是对 `react-router-dom` 的 `Link` 组件 与 `antd` 的 `Typography.Link` 组件的扩展，在此处只列出额新增的 API 其它 AP 请查看对应组件的文档。

| 参数   | 说明                               | 类型                                                        | 默认值 |
| :----- | :--------------------------------- | :---------------------------------------------------------- | :----- |
| to     | 链接地址配置                       | Partial<{ pathname: string; search: string; hash: string }> | -      |
| state  | BrowserHistory 模式状态存储配置    | any                                                         | -      |
| button | 新窗口打开时，支持以按钮的形式配置 | [ButtonProps](https://ant.design/components/button-cn#api)  | -      |
