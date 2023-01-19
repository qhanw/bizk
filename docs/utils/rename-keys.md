---
title: renameKeys
group:
  title: 对象操作
  order: 0
---

# renameKeys

用于前后端数据映射处理，可以是后端到前端，也可以是前端到后端

### 示例

#### 完全匹配替换

```tsx | pure
import { renameKeys } from '@bizk/utils';

// 将键名 'c' 替换成 'd'
renameKeys({ a: 1, b: 2, c: 3 }, { c: 'd' });

// => { d: 3 }
```

#### 仅替换键名

```tsx | pure
import { renameKeys } from '@bizk/utils';

// 将键名 'c' 替换成 'd'
renameKeys({ a: 1, b: 2, c: 3 }, { c: 'd' }, { simplify: false });

// => { a: 1, b: 2, d: 3 }
```

### API

| 参数    | 说明                     | 类型                                         | 默认值 |
| :------ | :----------------------- | :------------------------------------------- | :----- |
| data    | 需在处理键名替换的原数据 | Record<string, any> \| Record<string, any>[] | -      |
| options | 需要替换的键值名配置     | Record<string, string>                       | -      |
| config  | 替换规制配置             | [Config](#onfig)                             | -      |

#### Config

| 参数        | 说明                                                        | 类型                                              | 默认值   |
| :---------- | :---------------------------------------------------------- | :------------------------------------------------ | :------- |
| simplify    | 是否按替换配置返回数据，设置为 false 时同时返回未被替换的值 | boolean                                           | true     |
| childrenKey | 当数据结构为树时，指定迭代子集的键名                        | string                                            | children |
| callback    | 用于处理当前迭代的数据对象                                  | (obj: Record<string, any>) => Record<string, any> | -        |
