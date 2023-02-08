# @bizk/components

[![NPM version](https://img.shields.io/npm/v/@bizk/components.svg?style=flat)](https://npmjs.org/package/@bizk/components)
[![NPM downloads](https://img.shields.io/npm/dm/@bizk/components.svg?style=flat)](https://npmjs.org/package/@bizk/components)

基于 antd 额外扩展配置的常用业务组件，用以提升业务开发效率，避免同一类似功能组件多次实现。

[详细文档](https://bizk.qhan.wang/components)

### 安装方式

推荐使用`pnpm`作为包管理工具。当然也可使用`npm`或者`yarn`。

```bash
pnpm add @bizk/components
```

### 使用方式

```tsx
import { ALink } from '@bizk/components';

const App = () => (
  <>
    <ALink href="https://bizk.qhan.wang/">Click me!</ALink>
  </>
);
```
