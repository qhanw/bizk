import { DndContext } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';

export function Wrapper(props: any) {
  return (
    <DndContext modifiers={[restrictToHorizontalAxis]} >
      <table {...props} />
    </DndContext>
  );
}
