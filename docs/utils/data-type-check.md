---
title: Data Type Check
group:
  title: 类型检查
  order: 0
---

# Data Type Check

用于检测数据类型（coming soon）

### checkDataType

#### Params

| 参数 | 说明                     | 类型     | 默认值 |
| :--- | :----------------------- | :------- | :----- |
| data | 需要检测的数据类型的数据 | any      | -      |
| type | 作为对比的数据类型名称   | DataType | -      |

> DataType : string | number | object | function | undefined | null | boolean | date | regexp | symbol

```tsx | pure
import { isArray } from '@bizk/utils';

const isArr = isArray([]);
// => true
```

### isArray

```tsx | pure
import { isArray } from '@bizk/utils';

const isArr = isArray([]);
// => true
```
