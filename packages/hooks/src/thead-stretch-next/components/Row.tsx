import React from 'react';

export function Row(props: any) {
  const { children, ...rest } = props;

  return (
    <tr {...rest}>
      {React.Children.map(children, (child, index) => {
        const { dataIndex, key, draggable } = child.props.column;
        return React.cloneElement(child, {
          additionalProps: { index, id: dataIndex || key, draggable },
        });
      })}
    </tr>
  );
}
