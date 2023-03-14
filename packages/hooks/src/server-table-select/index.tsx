import { useState, useMemo, useCallback } from 'react';

import type { ProTableProps } from '@ant-design/pro-components';
import useAsync from './useAsync';

const defaultBatchParams = { excludes: 'excludes', includes: 'includes' };

type SelectedInfo = {
  type: 'all' | 'current' | undefined;
  selectableTotal: number;
  selectedRowKeys: React.Key[];
  selected: boolean;
  selectedTotal: number;
};

type TableSelectOpts<T, U> = Omit<ProTableProps<T, U>, 'request'> & {
  request: (params: U, authKey: string) => Promise<any>;

  // 处理查询参数
  adapterParams?: (params: any, sorter: any) => any;

  // 额外查询参数配置
  batchParams?: { includes: string; excludes: string };
  disabledRow?: (record: any) => boolean; // 禁止选择行
  // 权限 KEY
  authKey?: string;
};

type QueryCondition = {
  condition: any;
  selectedTotal: number;
  type: 'all' | 'current';
};

type ExtraTableSelectOpts = {
  // 已选择数据信息
  selectedInfo: SelectedInfo;
  // 重置全选状态
  resetSelection: () => void;
  // 取出查询参数
  takeQueryParams: () => Record<string, any>;
};

// reference: https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref/58473012#58473012

// type BlackEndSelectTableFn = {
//   <T, U>(opts: TableSelectOpts<T, U>): Omit<TableSelectOpts<T, U>, 'request'> &
//     ExtraTableSelectOpts;
// };

export default function useServerTableSelect<T, U = Record<string, any>>(
  opts: TableSelectOpts<T, U>,
): ExtraTableSelectOpts & {
  options: Partial<Omit<ProTableProps<T, U>, 'column'>>;
} {
  const {
    request: fetchApi,
    adapterParams,
    batchParams: { excludes, includes } = defaultBatchParams,
    disabledRow,
    authKey = '',
    rowKey,
    pagination,
    ...other
  } = opts;

  const [selectType, setSelectType] = useState<QueryCondition['type']>();

  const [allDataKeys, setAllDataKeys] = useState<string[]>([]);
  const [unSelected, setUnSelected] = useState<string[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [queryParams, setQueryParams] = useState();

  const { run: fetchList, data: { selectableTotal = 0, total = 0 } = {} } =
    useAsync(
      async (params) => {
        const {
          success,
          data: { wholeOperationNum, items: d, totalNum },
        } = await fetchApi(params, authKey);

        if (success) {
          return {
            selectableTotal: wholeOperationNum ?? totalNum,
            total: totalNum,
            data: d,
            success: true,
          };
        }
        return { selectableTotal: 0, total: 0, data: [], success: false };
      },
      {
        manual: true,
        onSuccess: ({ data: d }) => {
          // 取出id集合，并过滤掉已存在allDataKeys中的ids
          if (d.length) {
            const ids = d
              .map((c: any) =>
                !disabledRow?.(c) && rowKey ? c[rowKey as string] : undefined,
              )
              //.map((c: any) => (!disabledStatus.includes(c.graphState) ? c[rowKey] : undefined))
              .filter((c: any) => c && !allDataKeys.includes(c));

            // 加判断减少不必要在更新，如果ids有新值则更新
            if (ids.length) {
              const nextAllDataKeys: string[] = [...allDataKeys, ...ids];

              // 存储已加载页的数据集合，用于全选时筛选反选数据
              setAllDataKeys(nextAllDataKeys);

              if (selectType === 'all') {
                setSelectedRowKeys(
                  nextAllDataKeys.filter((c) => !unSelected.includes(c)),
                );
              }
            }
          }
        },
      },
    );

  const selectedInfo = useMemo(
    () => ({
      type: selectType,
      selectableTotal,
      selectedRowKeys,
      selected: !!(
        (selectType === 'all' && selectableTotal) ||
        selectedRowKeys?.length
      ),
      selectedTotal:
        selectType === 'all'
          ? (selectableTotal ?? total) - (unSelected?.length || 0)
          : selectedRowKeys?.length || 0,
    }),
    [selectType, selectableTotal, selectedRowKeys, total, unSelected],
  );

  const onSelectChange = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys);

    if (selectType === 'all') {
      // 求出反选数据
      setUnSelected(allDataKeys.filter((c) => !selectedKeys.includes(c)));
    } else {
      if (unSelected.length) setUnSelected([]);
    }
  };

  // 对勾选设计到的变量初始化
  const resetSelection = () => {
    setSelectType(undefined);
    setUnSelected([]);
    setSelectedRowKeys([]);
  };

  // 查询参数
  const takeQueryParams = useCallback(() => {
    const isAll = selectType === 'all';

    const { currentPage, pageSize, ...restQueryParams } = (queryParams ||
      {}) as any;

    const p = {
      selectedTotal: selectedInfo.selectedTotal,
      type: isAll ? '1' : '0',
      ...(isAll ? { [excludes]: unSelected } : { [includes]: selectedRowKeys }),
      // 查询的字段
      condition: restQueryParams,
    };

    return p;
  }, [
    selectType,
    excludes,
    includes,
    unSelected,
    selectedRowKeys,
    queryParams,
  ]);

  const request = async (params: any, sorter: any) => {
    const query = adapterParams?.(params, sorter) || params;
    setQueryParams(query);
    return await fetchList(query);
  };

  return {
    // 选择信息
    selectedInfo,
    // 重置全选状态
    resetSelection,
    // 获取查询参数
    takeQueryParams,

    // 表格属性配置
    options: {
      rowKey,
      request,

      search: { labelWidth: 70, defaultCollapsed: true },
      onSubmit: resetSelection,

      pagination: pagination
        ? {
            pageSizeOptions: [10, 20, 30, 50],
            defaultPageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            size: 'default',
            showTotal: (t) => `共有 ${t} 条`,
            ...pagination,
          }
        : false,

      rowSelection: {
        columnWidth: 48,
        selectedRowKeys,
        onChange: onSelectChange,
        preserveSelectedRowKeys: true,
        selections: [
          {
            key: 'all',
            text: '全部',
            onSelect: () => {
              setSelectType('all');
              setUnSelected([]);
              setSelectedRowKeys(allDataKeys);
            },
          },
          {
            key: 'current',
            text: '当前页',
            onSelect: (changeableRowKeys) => {
              setSelectType('current');
              setUnSelected([]);
              setSelectedRowKeys(changeableRowKeys);
            },
          },
        ],
        getCheckboxProps: (record) => ({
          // Column configuration not to be checked
          // disabled: disabledStatus.includes(record?.graphState),
          disabled: !!disabledRow?.(record),
        }),
        alwaysShowAlert:
          (selectType === 'all' && selectableTotal) || selectedRowKeys?.length,
      },
      tableAlertRender: () => `已选择 ${selectedInfo.selectedTotal} 项`,
      tableAlertOptionRender: () => <a onClick={resetSelection}>取消选择</a>,
      scroll: { x: 1200 },
      ...other,
    },
  };
}
