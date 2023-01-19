---
title: calcTableOptWidth
group:
  title: 业务函数
  order: -1
---

# calcTableOptWidth

用于计算表格操作列宽度。在表格操作列项存在权限控制的情况下，会出现列宽不定的情况，该方法主要解决此类问题。

### 示例

```tsx | pure
import { calcTableOptWidth } from '@bizk/biz';

const { optsWidth, getOptsBtn } = useMemo(() => {
  const editBtn = checkAuth('AUTH:EDIT');
  const delBtn = checkAuth('AUTH:DEL');

  return {
    optsWidth: calcTableOptWidth({
      2: [editBtn, delBtn],
      4: mgtBtn,
    }),
    getOptsBtn: (record: NameListItem) => {
      const { listCode, dictListType } = record;
      return (
        <Space size={0} split={<Divider type="vertical" />}>
          {editBtn ? <a>编辑</a> : null}
          {delBtn ? <a>删除</a> : null}
        </Space>
      );
    },
  };
}, []);
```

### API

| 参数     | 说明                                     | 类型                    | 默认值 |
| :------- | :--------------------------------------- | :---------------------- | :----- |
| widthCfg | 配置权限按钮，键名为文本个数，或按钮长度 | WidthCfgType            | -      |
| options  | 配置当前计算规则，一般采用默认参数即可   | [OptionsType](#options) | -      |

`WidthCfgType = Record<number, boolean | boolean[]> | Map<number, boolean | boolean[]>`

#### Options

| 参数    | 说明                   | 类型    | 默认值 |
| :------ | :--------------------- | :------ | :----- |
| divider | 分隔符宽度             | number  | 17     |
| padding | 单元格 内填充宽度      | number  | 16     |
| size    | 字体大小               | number  | 14     |
| limit   | 操作项 显示个数限制    | number  | 3      |
| extra   | 更多下拉按钮配置       | number  | 42     |
| link    | 是否采用文本链接的方法 | boolean | true   |
