---
title: dict
---

# dict 字典操作

用于应用中字典常量处理。前端自定义字典表预设与服务端字典数据结合生成全量字典表后，通过指定字典键名获取对应字典数据。

### 初始化

在应用入口优化初始化字典配置，主要目的为配置数据来源。

```tsx | pure
import { dict } from '@bizk/utils';
// 服务端字典数据
import { queryDicts } from '@/services/common';
// 前端预设数据
import { FE_DICT } from '@/constant/dict/predefine';

// 初始化数据配置
export default async function () {
  const dicts = await queryDicts()
  const merge = Object.assign(FE_DICT, dicts));

  // 本地 localStorage 数据存
  localStorage.setItem("dicts", JSON.stringify(merge));

  // 初始化字典 -  配置字典数据源
  dict.addPlugins([
    function fetch() {
      return merge || localStorage.getItem('dicts') || {};
    },
  ]);

  return { };
}
```

### 说明

字典函数主要功能为获取指定`DictCode`的字典数据， 同时也支持刷新当前字典表。并在返回对象上提供了`toMap`、`toName`方法用于转换获取数据的展示形式，默认返回字典数组结构或`undefined`。

```ts | pure
dict(DictCode.DICT001); // 返回指定 DictCode 的字典数据  [] or undefined

dict(DictCode.DICT001)?.toMap(); // 返回指定 DictCode 的字典数据的 Map 数据结构，用于 pro-components 数据渲染

dict(DictCode.DICT001)?.toMap({ colors: ['#4DCB73', '#3C93EA', '#FF4D4F'] }); // 对 Map 数据进行扩展

dict(DictCode.DICT001)?.toName(); // 返回指定 DictCode 的字典的名称

dict.update(); //更新字典数据
```

#### DictCode

由字典数据生成的枚举数据，主要用于代码编写时，提示当前字典码表示的具体含义。目前由开发手动编写，计划得到字典表后自动生成。该码值也可用字符串替换，不过不利于阅读。示例代码如下：

```ts | pure
export enum DictCode {
  /** 数值校验类型
   * @return SZJK04501 最小值
   * @return SZJK04502 最大值
   */
  SZJK045 = 'SZJK045',
  /** 数值校验类型 - 最小值 */
  SZJK04501 = 'SZJK04501',
  /** 数值校验类型 - 最大值 */
  SZJK04502 = 'SZJK04502',

  /** 风险等级
   * @return DICT002001 低
   * @return DICT002002 中
   * @return DICT002003 高
   */
  DICT002 = 'DICT002',
  /** 风险等级 - 低 */
  DICT002001 = 'DICT002001',
  /** 风险等级 - 中 */
  DICT002002 = 'DICT002002',
  /** 风险等级 - 高 */
  DICT002003 = 'DICT002003',

  // -- FE custom Code
  /** 是否选择
   * @return 1 是
   * @return 0 否
   */
  FE_DICT01 = 'FE_DICT01',
  /** 是否选择 - 否 */
  FE_DICT010 = 'FE_DICT010',
  /** 是否选择 - 是 */
  FE_DICT011 = 'FE_DICT011',

  /** 停用/启用
   * @return 1 启用
   * @return 0 停用
   */
  FE_DICT02 = 'FE_DICT02',
  /** 停用/启用 - 停用 */
  FE_DICT020 = 'FE_DICT020',
  /** 停用/启用 - 启用 */
  FE_DICT021 = 'FE_DICT021',
}
```
