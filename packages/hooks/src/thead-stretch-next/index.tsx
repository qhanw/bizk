import { useMemo } from 'react';

import { Wrapper } from './components/Wrapper';
import { Row } from './components/Row';
import { Cell } from './components/Cell';
import './index.scss';

import type { TableProps } from 'antd';

type TheadStretchOptions = {
  columns: any; // 表格 columns，用于扩展
  minLimit?: number; // 拖动最小宽度 默认 80
  maxLimit?: number; // 拖动最大宽度 默认无穷(Infinity)
  cache?: boolean; // 是否缓存表格列宽
};

type TheadStretchRes<T> = {
  components: TableProps<T>['components'];
  columns: TableProps<T>['columns'];
  tableWidth: number | string;
  reset: () => void;
};

export default function useTheadStretch<T>({
  columns,
  ...others
}: TheadStretchOptions): TheadStretchRes<T> {
  const cols = useMemo(() => {
    return columns.map((c: any) => {
      const varCol = `--dnd-col-${c.dataIndex || c.key}`;
      return Object.assign(c, {
        width: c.width ? `var(${varCol}, ${c.width}px)` : `var(${varCol})`,
      });
    });
  }, [columns]);

  return {
    components: {
      table: Wrapper,
      header: {
        row: Row,
        cell: (props: any) => <Cell {...props} {...others} />,
      },
    },
    columns: cols,
    tableWidth: '100%',
    reset: () => {},
  };
}
