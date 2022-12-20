---
nav:
  title: Regexp
  order: -1
group:
  title: 介绍
  order: -1
title: 常用正则表达式
---

### 手机号码

```tsx | pure
import { iphone } from '@libra/regexp';

iphone.test('15828058888');
```

### 电子邮箱

```tsx | pure
import { email } from '@libra/regexp';

email.test('libra@libra.com');
```

### URL

```tsx | pure
import { url } from '@libra/regexp';

url.test('github.com/qhanw');
```

### 身份证号

```tsx | pure
import { idCard } from '@libra/regexp';

idCard.test('510101198812125432');
```

### IP 地址

```tsx | pure
import { ip } from '@libra/regexp';

ip.test('192.168.8.8');
```

### 银行卡号

```tsx | pure
import { bankCard } from '@libra/regexp';

bankCard.test('6222024444428455333');
```

### 统一社会信用代码

```tsx | pure
import { uscc } from '@libra/regexp';

uscc.test('6222024444428455333');
```

### 邮政编码

```tsx | pure
import { postcode } from '@libra/regexp';

postcode.test('6222024444428455333');
```
