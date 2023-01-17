# @bizk/store

[![NPM version](https://img.shields.io/npm/v/@bizk/store.svg?style=flat)](https://npmjs.org/package/@bizk/store)
[![NPM downloads](https://img.shields.io/npm/dm/@bizk/store.svg?style=flat)](https://npmjs.org/package/@bizk/store)

一个简单的，用于处理本地信息存储的 Storage 库，默认存储方式为`localStorage`。目前处理新的设计中，该文档为旧的使用方式。

[详细文档](https://bizk.qhan.wang/store)

### 安装方式

推荐使用`pnpm`作为包管理工具。当然也可使用`npm`或者`yarn`。

```bash
pnpm add @bizk/store
```

### 初始化

在项目根下，创建`store.ts`文件，然后复制下面代码到文件中，之后就可以在项目中其它地方使用啦。

```tsx ｜ pure
// 旧的使用方式，新的模式还处理设计中
import { LegacyStore as Store } from '@bizk/store';

const store = new Store({ mode: 'local', crypto: true });

// Test 请在项目中删除
store.set('store-test', 'test');

// 配置其它具有意义的Storage方法，请替换成自己业务中的实际方法
export const getToken = () => store.get('token');
export const setToken = () => store.set('token', 'token - user token');

export default store;
```

### API

| 参数   | 说明                       | 类型               | 默认值  |
| :----- | :------------------------- | :----------------- | :------ |
| mode   | 存储方式                   | 'local'\|'session' | 'local' |
| crypto | 是否加密                   | boolean            | false   |
| expire | 过期时间,小于 0 为永不过期 | number             | 0       |

### 实例方法

| 参数   | 说明                 | 类型                              |
| :----- | :------------------- | :-------------------------------- |
| get    | 获取给定名称的存储值 | (name: string) => any             |
| set    | 设置一个存储值       | (name:string, data:any) => any    |
| setAll | 批量设置多个存储值   | (data:Record<string, any>) => any |
| del    | 删除一项或多项数据   | (name: string ｜ string[]) => any |
| clear  | 清除所用存储值       | () => any                         |
