import React from 'react';
import clsx from 'clsx';

import { useSortable } from '@dnd-kit/sortable';

const prefixCls = 'bizkui';

export function SortableItem(props: any) {
  const id = props['data-row-key'];
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const dragStyle = {
    transition,
    // transform: CSS.Translate.toString(transform),
    '--translate-x': `${transform?.x ?? 0}px`,
    '--translate-y': `${transform?.y ?? 0}px`,
  };

  const { style, className, children, ...rest } = props;

  return (
    <tr
      id={id}
      ref={setNodeRef}
      {...attributes}
      // {...listeners}
      className={clsx(className, `${prefixCls}-dragItem`, {
        [`${prefixCls}-dragOverlay`]: isDragging,
      })}
      style={{ ...style, ...dragStyle }}
      {...rest}
      data-cypress="draggable-item"
    >
      {React.Children.map(children, (child) => {
        if (child.key === 'sort') {
          return React.cloneElement(child, {
            additionalProps: {
              ...listeners,
              'data-cypress': 'draggable-handle',
              id: 'draggable-handle',
            },
          });
        }
        return child;
      })}
    </tr>
  );
}
