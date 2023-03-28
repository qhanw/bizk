import { useRef, useLayoutEffect } from 'react';

import { parents, cssToObj, objToCss, limit } from '../utils';

type DragCell = {
  isDragging: boolean;
  offset: number;
  targetElem: any;
  minLimit?: number;
  maxLimit?: number;
  cache?: boolean;
};

const cursor = 'cursor'; // 游标样式

export default function useDragCell({
  isDragging,
  offset,
  targetElem: th,
  minLimit = 80,
  maxLimit = Infinity,
  cache = false,
}: DragCell) {
  const refOffset = useRef<number>(0);

  useLayoutEffect(() => {
    if (!th) return;

    const handle = th.querySelector(
      `:scope i[data-cypress="draggable-handle"]`,
    );

    if (!handle) return;

    // 表格元素
    const t = parents(th, 'table')[0];
    const tcl = t.classList;

    // 添加标尺
    if (isDragging) {
      if (!tcl.contains(cursor)) tcl.add(cursor);
    } else {
      if (tcl.contains(cursor)) tcl.remove(cursor);
    }

    if (isDragging) {
      // 处理拖动中，计算游标偏移量，并存储最终拖动偏移
      const rect = handle.getBoundingClientRect();
      const tRect = t.getBoundingClientRect();

      // 计算游标偏移量
      const x = Math.round(rect.x - tRect.x + offset - 2);

      // t.parentNode.parentNode.style.cssText = `--dnd-translate-x: ${x}px`;
      t.style.cssText = objToCss({
        ...cssToObj(t.style.cssText),
        '--dnd-translate-x': `${x}px`,
      });

      refOffset.current = offset; // 存储最后偏移位置,以便后续设置对应单元格宽度
    } else {
      // 停止拖动时，设置单元格最终宽度
      // t.parentNode.parentNode.removeAttribute('style');

      // 游标样式清理
      const cssObj = cssToObj(t.style.cssText);
      delete cssObj['--dnd-translate-x'];
      t.style.cssText = objToCss(cssObj);

      // 当发生偏移时设置当前单元格宽度
      if (refOffset.current !== 0) {
        const r = t.querySelector(':scope colgroup');
        // 计算 当前单元格宽度与表格宽度，需在设置宽度前获取初始元素宽度信息
        const tht = th.getBoundingClientRect(); // 表头单元格
        const trt = t.getBoundingClientRect(); //  表格

        const mark = `--dnd-col-${th.getAttribute('id')}`;

        const oldCssR = cssToObj(r.style.cssText);
        const oldCssT = cssToObj(t.style.cssText);

        // 单元格宽度与真实偏移量
        const { width: w, offset: real } = limit(tht.width, {
          min: minLimit,
          max: maxLimit,
          offset: refOffset.current,
        });

        // 表格宽度
        const tWidth = trt.width + real;

        // 设置单元格宽度
        r.style.cssText = objToCss({ ...oldCssR, [mark]: `${w}px` });

        // 设置表格宽度
        // 当偏移量为正数时，表格宽度为当前宽度加上偏移量，当偏移量为负数时，表格宽度恢复到100%，并
        t.style.cssText = objToCss({ ...oldCssT, width: `${tWidth}px` });
      }
    }
  }, [isDragging, offset, th]);
}
