import { describe, expect, test } from 'vitest';
import dict from '.';

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
  SZJK045 = 'SZJK045',

  DICT002 = 'DICT002',
}

describe('idCardRegexp', () => {
  dict.addPlugins([
    function fetch() {
      return localStorage.getItem('dict') || data;
    },
  ]);

  test('take the value of DictCode SZJK045', () => {
    expect(dict<DictCode>(DictCode.SZJK045)).toEqual(undefined);
  });

  test('take the value of DictCode DICT002', () => {
    expect(dict<DictCode>(DictCode.DICT002)).toEqual([
      { editable: false, label: '低', value: 'DICT002001' },
      { editable: false, label: '中', value: 'DICT002002' },
      { editable: false, label: '高', value: 'DICT002003' },
    ]);
  });

  test('take the Map value of DictCode DICT002', () => {
    expect(dict<DictCode>(DictCode.DICT002)?.toMap()).toEqual(
      new Map([
        ['DICT002001', { text: '低' }],
        ['DICT002002', { text: '中' }],
        ['DICT002003', { text: '高' }],
      ]),
    );
  });

  test('take the name of DictCode DICT002', () => {
    expect(dict<DictCode>(DictCode.DICT002)?.toName()).toEqual('风险等级');
  });
});
