import { useMemo } from 'react';

import { Wrapper } from './components/Wrapper';
import { Row } from './components/Row';
import { Cell } from './components/Cell';
import './index.scss';

type TheadStretchOptions = {
  columns: any; // 表格 columns，用于扩展
  cache?: boolean; // 是否缓存表格列宽
};

export default function useTheadStretch({ columns }: TheadStretchOptions) {
  const cols = useMemo(() => {
    return columns.map((c: any) => {
      const varCol = `--dnd-col-${c.dataIndex || c.key}`;
      return Object.assign(c, {
        width: c.width ? `var(${varCol}, ${c.width}px)` : `var(${varCol})`,
      });
    });
  }, [columns]);

  return {
    components: { table: Wrapper, header: { row: Row, cell: Cell } },
    columns: cols,
    tableWidth: 1000,
    reset: () => {},
  };
}
