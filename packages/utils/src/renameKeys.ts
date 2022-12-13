function isEmptyObject(obj: Record<string, any>): boolean {
  if (!obj || Object.prototype.toString.call(obj) === '[object Object]') {
    return false;
  }
  return !Object.keys(obj).length;
}

interface ReplaceConfig {
  // 是否按替换配置返回数据，设置为 false 时同时返回未被替换的值
  simplify?: boolean;
  childrenKey?: string;
  callback?: (obj: Record<string, any>) => Record<string, any>;
}

function replaceKeys(
  data: Record<string, any>[] | Record<string, any>,
  options: Record<string, any>,
  config: ReplaceConfig,
) {
  const { simplify, childrenKey, callback } = config;
  const params = {}; // 保证键值顺序性
  Object.entries(data).forEach(([key, val]) => {
    // simplify: true 全替换，多余参数过滤掉
    // simplify: false 换配置中没有找到则用原来键名
    // 如果key为子集键名则采用key

    let fields = simplify
      ? key === childrenKey
        ? key
        : options[key]
      : options[key] || key;

    if (fields) {
      if (!Array.isArray(fields)) fields = [fields];

      fields.forEach((field: string) => {
        if (val) Reflect.set(params, field, val);
      });
    }
  });

  // 过滤数据
  return callback ? callback(params) : params;
}

/**
 * 替换对象键名，支持普通对象、对象数组以及树对象，支持过滤功能
 *
 * @param data 需要处理的数据
 * @param options 需要替换的Keys配合
 * @param config 替换配置
 * @returns 处理后的数据
 * @example
 * ```ts
 * replaceObjectKeys({ a: 1, b: 2, c: 3 }, { c: 'value' })
 * // => { value: 3 }
 * ```
 */
const renameKeys = function f(
  data: any,
  options: object,
  config?: ReplaceConfig,
) {
  // 如果未配置 options 则直接返回数据
  if (!data || !options || isEmptyObject(data) || isEmptyObject(options))
    return data;

  const nextConfig: ReplaceConfig = {
    simplify: true,
    childrenKey: 'children',
    ...config,
  };

  const childrenKey = nextConfig.childrenKey || 'children';

  if (Array.isArray(data)) {
    return data.reduce((final, curr) => {
      const next = replaceKeys(curr, options, nextConfig);

      if (next) {
        // 判断是否有子无素
        const children = next[childrenKey];

        if (children && Array.isArray(children)) {
          next[childrenKey] = f(children, options, nextConfig);
        }

        final.push(next);
      }

      return final;
    }, []);
  }

  if (Object.prototype.toString.call(data) === '[object Object]') {
    return replaceKeys(data, options, nextConfig);
  }

  return data;
};

export default renameKeys;
