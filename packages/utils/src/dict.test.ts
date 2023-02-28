import dict from './dict';

const data = {
  DICT001: {
    label: '事件类型',
    value: 'DICT001',
    children: [
      { label: '通过', value: 'DICT001001', editable: false },
      { label: '拦截事件', value: 'DICT001002', editable: false },
      { label: '预警事件', value: 'DICT001003', editable: false },
    ],
  },
  DICT001001: { label: '通过', value: 'DICT001001', editable: false },
  DICT001002: { label: '拦截事件', value: 'DICT001002', editable: false },
  DICT001003: { label: '预警事件', value: 'DICT001003', editable: false },

  DICT002: {
    label: '风险等级',
    value: 'DICT002',
    children: [
      { label: '低', value: 'DICT002001', editable: false },
      { label: '中', value: 'DICT002002', editable: false },
      { label: '高', value: 'DICT002003', editable: false },
    ],
  },
  DICT002001: { label: '低', value: 'DICT002001', editable: false },
  DICT002002: { label: '中', value: 'DICT002002', editable: false },
  DICT002003: { label: '高', value: 'DICT002003', editable: false },

  DICT003: {
    label: '预警状态',
    value: 'DICT003',
    children: [
      { label: '待处置', value: 'DICT003001', editable: false },
      { label: '处置中', value: 'DICT003002', editable: false },
      { label: '已关闭', value: 'DICT003003', editable: false },
    ],
  },
  DICT003001: { label: '待处置', value: 'DICT003001', editable: false },
  DICT003002: { label: '处置中', value: 'DICT003002', editable: false },
  DICT003003: { label: '已关闭', value: 'DICT003003', editable: false },
};

enum DictCode {
  /** 数值校验类型
   * @return SZJK04501 最小值
   * @return SZJK04502 最大值
   */
  SZJK045 = 'SZJK045',

  SZJK04501 = 'SZJK04501',
}

dict.addPlugins([
  function fetch() {
    return localStorage.getItem('dict') || data;
  },
]);

const zd1 = dict<DictCode>(DictCode.SZJK045);

console.log(zd1);

console.log('zd1 ', zd1?.toMap());

console.log('zd1', zd1?.toName());

zd1?.map((c) => console.log(c));

console.log('== update ========');

dict.update?.();

const d = dict<DictCode>(DictCode.SZJK045);

console.log(d);
