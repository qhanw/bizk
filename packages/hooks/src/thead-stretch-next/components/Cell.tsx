import { useRef } from 'react';
import { useDraggable } from '@dnd-kit/core';

import useDragCell from './useDragCell';
import '../index.scss';

export function Cell(props: any) {
  const ref = useRef<any>();

  const { id, index, draggable = true } = props;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const { children, className, ...rest } = props;

  // 拖拽偏移量
  const offset = Math.round(transform?.x || 0);

  // 拖拽相关
  useDragCell({ isDragging, offset, targetElem: ref.current, ...rest });

  return (
    <th {...rest} className={className} ref={ref}>
      {children}
      {id && draggable ? (
        <i
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={{
            display: 'block',
            position: 'absolute',
            top: '0',
            right: '0',
            height: '100%',
            width: 1,
            backgroundColor: 'rgba(255, 0, 0, .35)',
            cursor: 'col-resize',
            zIndex: 3,
          }}
          data-cypress="draggable-handle"
        />
      ) : null}
    </th>
  );
}
