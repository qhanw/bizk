/** 键名为文本个数，或按钮长度 */
type WidthCfgType = Record<number, boolean | boolean[]> | Map<number, boolean | boolean[]>;
type OptionsType = {
  // 17 分隔符宽度
  divider?: number;
  // 16 单元格 内填充宽度
  padding?: number;
  // 字体大小
  size?: number;
  // 操作项 显示个数限制
  limit?: number;
  // 更多下拉按钮配置
  extra?: number;
  /** 是否采用文本链接的方法 */
  link?: boolean;
};

const calcTableOptWidth = (widthCfg: WidthCfgType, options?: OptionsType) => {
  const { divider = 17, padding = 16, size = 14, extra = 42, link = true, limit } = options || {};

  const isMap = widthCfg instanceof Map;

  const cfg = isMap ? [...widthCfg] : (Object.entries(widthCfg) as any[]);

  const vis = cfg.reduce<number[]>((prev, [key, val]: [number, boolean | boolean[]]) => {
    if (Array.isArray(val)) {
      const w = val.reduce<number[]>((p, v) => (v ? [...p, +key] : p), []);
      prev.push(...w);
    } else {
      if (val) prev.push(+key);
    }
    return prev;
  }, []);

  // 计算文本链接宽度
  const limitVis = limit ? vis.slice(0, 2) : vis;
  const btnW = limitVis.reduce((prev, curr) => prev + curr, 0);
  const btnWidth = btnW * (link ? size : 1) + (limit ? extra : 0);

  // 计算隔符宽度
  const len = limit ? limit : vis.length;
  const dividerWidth = (len ? len - 1 : 0) * divider;

  // 最终宽度
  const elemWidth = btnWidth + dividerWidth;

  return elemWidth ? elemWidth + padding : 0;
};

export default calcTableOptWidth;
