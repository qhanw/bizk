import { Base64 } from 'js-base64';
import {
  isArray,
  isJSON,
  isObject,
  isUndefined,
  isNull,
  isNumber,
  isBoolean,
  isRegExp, // eslint-disable-line
} from './utils';

type StoreConfig = {
  /** Storage 存储方式 */
  mode?: 'local' | 'session';
  /** 是否加密 */
  crypto?: boolean;
  /** 默认过期时间
   * 例如：过期时间为6个小时，则配置为21600秒
   */
  expire?: number;
};

export class Store {
  constructor({ mode = 'local', crypto, expire = 0 }: StoreConfig) {
    this.store = mode === 'local' ? window.localStorage : window.sessionStorage;
    if (crypto) this.crypto = crypto;
    if (expire > 0) this.expire = expire;
  }

  private crypto = false;
  private store: Storage;
  // 过期时间小于0,表示永不过期
  private expire = -1;

  private encode(v: string) {
    return this.crypto ? Base64.encode(v) : v;
  }
  private decode(v: string) {
    if (!v) return v;
    return this.crypto ? Base64.decode(v) : v;
  }

  private serialize = (obj: any) => {
    if (isUndefined(obj)) {
      return `${obj}`;
    }
    return JSON.stringify(obj);
  };

  private deserialize = (str: string): any => {
    if (!str) return str;
    let val = '';
    try {
      val = JSON.parse(str);
    } catch (e) {
      val = str;
    }
    return val;
  };

  private remove(key: string) {
    this.store.removeItem(this.encode(key));
  }

  private handleExpire(key: string, val: any) {
    if (!val) return;

    if (!val.__expire) return val;

    if (val.__expire > +new Date()) {
      return val.data;
    } else {
      console.error(`The [${key}] value store has expired!`);
      this.remove(key);
      return;
    }
  }

  // 读取本地数据
  get(key: string | string[]) {
    if (Array.isArray(key)) {
      return key.reduce((prev, k) => {
        const data = this.handleExpire(
          k,
          this.deserialize(this.decode(this.store[this.encode(k)])),
        );

        if (data) {
          prev[k] = data;
        }

        return prev;
      }, {} as Record<string, any>);
    }

    return this.handleExpire(
      key,
      this.deserialize(this.decode(this.store[this.encode(key)])),
    );
  }

  /**
   * 设置本地存储
   * @param key: 键值名
   * @param val: 键值
   * @param expire: 失效时间，非必填，单位秒
   */
  set(key: string, val: any, expire?: number) {
    const exp = expire ?? this.expire;
    const cacheExpire = exp > 0 ? +new Date() + exp * 1000 : 0;

    // 如果配置有过期时间
    if (cacheExpire) {
      this.store[this.encode(key)] = this.encode(
        this.serialize({ data: val, __expire: cacheExpire }),
      );
      return;
    }

    if (isArray(val) || isJSON(val) || isObject(val)) {
      this.store[this.encode(key)] = this.encode(this.serialize(val));
      return;
    }
    if (isBoolean(val) || isNull(val) || isUndefined(val) || isNumber(val)) {
      this.store[this.encode(key)] = this.encode(this.serialize(val));
      return;
    }

    this.store[this.encode(key)] = this.encode(val.toString());
  }

  setAll(data: Record<string, any>) {
    for (const [key, val] of Object.entries(data)) {
      this.set(key, val);
    }
  }

  //   setAll(data:object, overwrite) {
  //     var changed, val;
  //     for (var key in data) {
  //         val = data[key];
  //         if (this.set(key, val, overwrite) !== val) {
  //             changed = true;
  //         }
  //     }
  //     return changed;
  // }

  // 与本地新旧数据合并
  // merge(key: string, val: any) {
  //   // 如果是数组或JSON 对象则数据可以合并，否则直接替换
  //   if (isArray(val) || isJSON(val) || isObject(val)) {

  //     const cache = this.deserialize(this.store[key]);

  //     if (isArray(val)) {
  //       this.store[key] = this.serialize([...this.deserialize(this.store[key]), ...val]);
  //     } else {
  //       this.store[key] = this.serialize({ ...this.deserialize(this.store[key]), ...val });
  //     }
  //   } else {
  //     this.set(key, val);
  //   }
  // }

  /** 删除一项或多项数据 */
  del(key: string | string[]) {
    if (Array.isArray(key)) {
      key.forEach((k) => this.remove(k));
    } else {
      this.remove(key);
    }
  }

  /** 清除所有数据，谨慎使用，建议用 "store.del" 移除 */
  clear = () => this.store.clear();
}
