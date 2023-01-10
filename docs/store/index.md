---
nav:
  title: Store
  order: 0
group:
  title: 介绍
  order: -1
---

# Store

一个简单的，用于处理本地信息存储的 Storage 库，默认存储方式为`localStorage`

### 初始化

```tsx ｜ pure
import { Store } from '@bizk/store';

const store = new Store({ mode: 'local', crypto: true });

store.set('a', 123);
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
