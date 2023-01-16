---
nav:
  title: Regexps
  order: 1
group:
  title: 介绍
  order: -1
title: 常用正则表达式
---

# 常用正则表达式

常用正则表达式，统一应用站点正则校验，保障同一规则下数据安全。

### 安装方式

推荐使用`pnpm`作为包管理工具。当然也可使用`npm`或者`yarn`。

```bash
pnpm add @bizk/regexps
```

### 示例

#### 手机号码

```tsx | pure
import { iphone } from '@bizk/regexps';

iphone.test('15828058888');
```

### 电子邮箱

```tsx | pure
import { email } from '@bizk/regexps';

email.test('libra@bizk.com');
```

### URL

```tsx | pure
import { url } from '@bizk/regexps';

url.test('github.com/qhanw');
```

### 身份证号

```tsx | pure
import { idCard } from '@bizk/regexps';

idCard.test('510101198812125432');
```

### IP 地址

```tsx | pure
import { ip } from '@bizk/regexps';

ip.test('192.168.8.8');
```

### 银行卡号

```tsx | pure
import { bankCard } from '@bizk/regexps';

bankCard.test('6222024444428455333');
```

### 统一社会信用代码

```tsx | pure
import { uscc } from '@bizk/regexps';

uscc.test('6222024444428455333');
```

### 邮政编码

```tsx | pure
import { postcode } from '@bizk/regexps';

postcode.test('6222024444428455333');
```
