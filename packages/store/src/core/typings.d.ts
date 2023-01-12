type Area = Storage;
export type StoreAPI = {
  area: (id: string, area: Area) => any;
  namespace: (namespace: string, singleArea: boolean, delim: string) => any;
  isFake: (force: boolean) => boolean;
  toString: () => string;
  has: (key: string) => any;
  size: () => number;
  each: (fn: () => void, fill) => any;
  keys: (fillList) => any;
  get: (key: string, alt) => any;
  getAll: (fillObj) => any;
  transact: (key, fn, alt) => any;
  set: (key, fn, alt) => any;
  setAll: (data, overwrite) => any;
  add: (key, data, replacer) => any;
  remove: (key, alt) => any;
  clear: () => any;
  clearAll: (key, data, replacer) => any;
  _in: (k) => any;
  _out: (k) => any;
};

export type StorageAPI = {
  length: number;
  has: (k: string) => boolean;
  key: (i: number) => void;
  setItem: (k: string, v: any) => void;
  removeItem: (k: string) => void;
  getItem: (k: string) => any;
  clear: () => void;
};

export type StoreBase = {
  areas: Record<string, any>;
  apis: Record<string, any>;

  /** 命名空间分隔符 */
  nsdelim: string;

  inherit: (api: T, o: Object) => T;
  stringify: (d: any, fn?: () => void) => string;
  parse: (s: string, fn?: () => void) => any;
  fn: (name: keyof StoreAPI, fn: () => void) => void;
  get: (area: Area, key: string) => void;
  set: (area: Area, key: string, string: string) => void;
  remove: (area: Area, key: string) => void;
  key: (area: Area, i: number) => void;
  length: (area: Area) => number;
  clear: (area: Area) => void;
  Store: (id: string, area?: Area, namespace?: string) => any;

  storeAPI: StoreAPI;
  storage: (name: string) => any;
  storageAPI: StorageAPI;

  /** 插件扩展 */
  replace?: () => void;
  revive?: () => void;
};
