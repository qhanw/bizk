import React, { useMemo } from 'react';
import { DragOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';

import { SortableItem } from './SortableItem';

import './styles.scss';

const prefixCls = 'bizkui';

type SortableTableProps = {
  onChange: (data?: any) => void;
  children: React.ReactElement;
};

export default function SortableTable({
  children,
  onChange,
}: SortableTableProps) {
  const { dataSource, columns, items, rowKey } = useMemo(() => {
    const props = children?.props as any;

    return {
      dataSource: props?.dataSource,
      columns: [
        {
          title: 'sort',
          dataIndex: 'sort',
          key: 'sort',
          width: 46,
          render: () => <DragOutlined />,
          align: 'center',
        },
        ...props?.columns,
      ],
      items: props?.dataSource?.map((c: any) => c[props?.rowKey]),
      rowKey: props?.rowKey,
    };
  }, [children?.props]);

  const handleDragEnd = (event: DragEndEvent) => {
    if (!dataSource?.length) return;
    const { active, over } = event;

    if (active[rowKey] !== over?.[rowKey]) {
      const oldIndex = dataSource.findIndex(
        (item: any) => item[rowKey] === active[rowKey],
      );
      const newIndex = dataSource.findIndex(
        (item: any) => item[rowKey] === over?.[rowKey],
      );

      const next = arrayMove(dataSource, oldIndex, newIndex);

      onChange?.(next);
    }
  };

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {React.cloneElement(children as any, {
          dataSource,
          columns,
          className: `${prefixCls}-dnd`,
          ...(dataSource?.length > 1
            ? { components: { body: { row: SortableItem } } }
            : {}),
        })}
      </SortableContext>
    </DndContext>
  );
}
