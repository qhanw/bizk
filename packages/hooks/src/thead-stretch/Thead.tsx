import type { FC, ThHTMLAttributes } from 'react';
import { memo, useEffect, useRef } from 'react';
import type { ResizeCallbackData } from 'react-resizable';
import { Resizable } from 'react-resizable';
import { useSafeState } from './utils/useSafeState';
import { isString } from './utils';

import './index.scss';

type ComponentProp = {
  onResize: (width: number) => void;
  onMount: (width: number) => void;
  onResizeStart?: (width: number) => void;
  onResizeEnd?: (width: number) => void;
  triggerRender: number;
  width: number;
  minWidth: number;
  maxWidth: number;
} & ThHTMLAttributes<HTMLTableCellElement>;

const Thead: FC<ComponentProp> = (props) => {
  const {
    width,
    minWidth,
    maxWidth,
    onResize,
    onResizeStart,
    onResizeEnd,
    onMount,
    triggerRender,
    className,
    style,
    onClick,
    children,
    rowSpan,
    colSpan,
    title,
    scope,
    ...rest
  } = props;

  const thRef = useRef<HTMLTableCellElement>(null);

  const [resizeWidth, setResizeWidth] = useSafeState<number>(0);

  useEffect(() => {
    if (width) {
      setResizeWidth(width);
      onMount?.(width);
    }
  }, [triggerRender]);

  useEffect(() => {
    if (width) {
      setResizeWidth(width);
    }
  }, [setResizeWidth, width]);

  if (!width || Number.isNaN(Number(width))) {
    return (
      <th
        {...rest}
        data-arh-disable="true"
        style={style}
        className={className}
        onClick={onClick}
        rowSpan={rowSpan}
        colSpan={colSpan}
      >
        <span title={title}>{children}</span>
      </th>
    );
  }

  const setBodyStyle = (active: boolean) => {
    document.body.style.userSelect = active ? 'none' : '';
    document.body.style.pointerEvents = active ? 'none' : '';
    document.documentElement.style.cursor = active ? 'col-resize' : '';
  };

  const onStart = ({}, data: ResizeCallbackData) => {
    setResizeWidth(data.size.width);
    setBodyStyle(true);
    onResizeStart?.(data.size.width);
  };

  const onSelfResize = ({}, data: ResizeCallbackData) => {
    setResizeWidth(data.size.width);
  };

  const onStop = () => {
    if (resizeWidth <= 0) return;
    onResize(resizeWidth);
    setBodyStyle(false);
    onResizeEnd?.(resizeWidth);
  };

  const isSimpleChildren = () => {
    if (Array.isArray(children)) {
      const lastChild = children[children.length - 1];
      if (lastChild) {
        return (
          isString(lastChild) ||
          lastChild.props?.ellipsis ||
          isString(lastChild.props?.label)
        );
      }
    }
    return false;
  };

  return (
    <th
      scope={scope}
      className={`resizable-container ${className}`}
      style={{
        ...style,
        overflow: 'unset',
      }}
      data-arh-enable="true"
      ref={thRef}
      onClick={onClick}
      rowSpan={rowSpan}
      colSpan={colSpan}
    >
      <Resizable
        className="resizable-box"
        width={resizeWidth}
        minConstraints={[minWidth, 0]}
        maxConstraints={[maxWidth, 0]}
        height={0}
        handle={
          <div
            className="resizable-handler"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="resizable-line" />
          </div>
        }
        draggableOpts={{ enableUserSelectHack: false }}
        onResizeStart={onStart}
        onResize={onSelfResize}
        onResizeStop={onStop}
      >
        <div style={{ width: resizeWidth, height: '100%' }} />
      </Resizable>
      <div
        {...rest}
        className={`resizable-title ${isSimpleChildren() ? 'ellipsis' : ''}`}
      >
        <span title={title}>{children}</span>
      </div>
    </th>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default memo(Thead);
