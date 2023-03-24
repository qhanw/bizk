import { useDraggable } from '@dnd-kit/core';
import { useEffect, useMemo, useRef } from 'react';
import '../index.scss';

const ellipsis = 'drag-cell-ellipsis';
const cursor = 'cursor';

export function Cell(props: any) {
  const ref = useRef<any>();
  const { id, index, draggable = true } = props;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const { children, className, minWidth = 80, ...rest } = props;

  // 拖拽偏移量
  const offset = Math.round(transform?.x || 0);

  // 当前单元格与相邻单元格宽度
  const { currThWidth, nextThWidth } = useMemo(() => {
    const elem = ref.current;
    return {
      currThWidth: elem?.offsetWidth,
      nextThWidth: elem?.nextElementSibling?.offsetWidth,
    };
  }, [isDragging]);

  useEffect(() => {
    const elem = ref.current;

    const t = elem.parentNode.parentNode.parentNode;
    const prevClsx = t.className;

    if (isDragging) {
      if (!prevClsx.includes(cursor)) {
        t.className = [prevClsx, cursor].filter((c) => c).join(' ');
      }
    } else {
      if (prevClsx.includes(cursor)) {
        t.className = prevClsx
          .split(' ')
          .filter((c: string) => c !== cursor)
          .join(' ');
      }
    }

    if (elem.children.length) {
      if (isDragging) {
        const target = elem.children[0];

        const rect = target.getBoundingClientRect();
        const tRect = t.getBoundingClientRect();

        const x = rect.x - tRect.x;

        console.log(rect);

        const prev = t.style.cssText;

        t.style.cssText = `${prev}--translate-x: ${x}px`;
      } else {
      }
    }
  }, [isDragging]);

  // 临时注释
  // useEffect(() => {
  //   const elem = ref.current;

  //   if (!elem || !isDragging) return;
  //   const thGroup = elem.parentNode.children;
  //   const colGroup = elem.parentNode.parentNode.previousElementSibling.children;

  //   const group = colGroup || thGroup;

  //   if (currThWidth >= 0 && nextThWidth >= 0 && offset !== 0) {
  //     const calcCurrThWidth = currThWidth + offset;
  //     const calcPrevThWidth = nextThWidth - offset;

  //     // 如果单元格宽度小于最小宽度赐停止宽度伸缩
  //     if (minWidth > calcCurrThWidth || minWidth > calcPrevThWidth) return;

  //     group[index].style.cssText = `width:${calcCurrThWidth}px;`;
  //     group[index + 1].style.cssText = `width:${calcPrevThWidth}px;`;

  //     // 添加文本溢出样式，解决在伸缩过程中因文本超长引起的闪烁问题
  //     const currThClsx = thGroup[index].className;
  //     const prevThClsx = thGroup[index + 1].className;

  //     if (!currThClsx.includes(ellipsis)) {
  //       thGroup[index].className = `${currThClsx} ${ellipsis}`;
  //     }

  //     if (!prevThClsx.includes(ellipsis)) {
  //       thGroup[index + 1].className = `${prevThClsx} ${ellipsis}`;
  //     }
  //   }
  // }, [currThWidth, nextThWidth, isDragging, offset, index]);

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
        />
      ) : null}
    </th>
  );
}
