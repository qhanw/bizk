type LabelValue = { label: string; value: string; children?: []; editable?: boolean };

function inherit(api: any, o: any) {
  for (let p in api) {
    if (!o.hasOwnProperty(p)) {
      const cfg = Object.getOwnPropertyDescriptor(api, p)!;
      Object.defineProperty(o, p, { ...cfg, enumerable: false });
    }
  }
  return o;
}

type DictAPI = {
  _name?: string;
  toName: () => string | undefined;
  toMap: () => Map<string, { text: string }> | undefined;
};

const dictAPI: DictAPI = {
  _name: undefined,

  toName: function () {
    return this._name;
  },
  toMap: function () {
    if (Array.isArray(this)) {
      return this?.reduce((prev, curr) => {
        prev.set(curr.value, { text: curr.label });
        return prev;
      }, new Map());
    }
    return this;
  },
};

type DictHashMap = Record<string, LabelValue>;

type DictBaseAPI = {
  _init: boolean;
  _plugins: Record<string, () => any>;
  _data: DictHashMap;
  update: () => void;
  init: () => void;
  addPlugins: (plugins: (() => any)[]) => void;
  _take: () => DictHashMap;
};

const dictBaseAPI: DictBaseAPI = {
  _init: false,
  _plugins: {},
  _data: {},
  // 取出字典映射表
  _take: function () {
    if (!this._init) this.init();
    return this._data || {};
  },
  // 更新字典
  update: function () {
    this._data = this._plugins.fetch();
  },
  init: function () {
    Object.values(this._plugins).forEach((c) => {
      if (c.name === 'fetch') {
        if (!this._data || !Object.keys(this._data).length) {
          this._data = c?.();
        }
      }
    });
    this._init = true;
  },

  addPlugins: function (plugins) {
    plugins.forEach((c) => {
      this._plugins[c.name] = c;
    });
  },
};

function Dict() {
  const dict = inherit(dictBaseAPI, function <T>(key: T): (LabelValue[] & DictAPI) | undefined {
    const target = dict._take()[key as string];

    if (target) {
      return inherit({ ...dictAPI, _name: target.label }, target.children || []);
    } else {
      return undefined;
    }
  }) as { <T>(key: T): (LabelValue[] & DictAPI) | undefined } & DictBaseAPI;

  return dict;
}

export default Dict();
