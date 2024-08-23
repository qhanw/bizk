import React, { useMemo } from 'react';

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

import Row from './Row';

type SortableTableProps = {
  onChange: (data?: any) => void;
  children: React.ReactElement;
};

export default function SortableTable({
  children,
  onChange,
}: SortableTableProps) {
  const { dataSource, columns, items, rowKey, sortable } = useMemo(() => {
    const props = children?.props as any;

    const ds = props?.dataSource || props?.value;
    const col = props?.columns;

    const sortable = ds?.length > 1;

    return {
      dataSource: ds,
      // editable: 兼容 pro-table
      columns: sortable
        ? [{ key: 'sort', width: 32, editable: false }, ...col]
        : col,
      items: ds?.map((c: any) => c[props?.rowKey]) || [],

      rowKey: props?.rowKey,
      sortable,
    };
  }, [children?.props]);

  const handleDragEnd = (event: DragEndEvent) => {
    if (!dataSource?.length) return;
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = dataSource.findIndex(
        (item: any) => item[rowKey] === active.id,
      );
      const newIndex = dataSource.findIndex(
        (item: any) => item[rowKey] === over?.id,
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
        {React.cloneElement(children as React.ReactElement, {
          columns,
          ...(sortable ? { components: { body: { row: Row } } } : {}),
        })}
      </SortableContext>
    </DndContext>
  );
}
