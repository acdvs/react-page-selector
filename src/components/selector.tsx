'use client';

import React, { useState } from 'react';

import usePages from '@/hooks/use-pages';
import { Button, PageButton } from './button';
import { PageSeparator, Separator } from './separator';
import Draggable from './draggable';

export function Selector() {
  const { pages, addPage, reorderPage } = usePages();
  const [activePage, setActivePage] = useState<number | undefined>();
  const [dragIdx, setDragIdx] = useState<number | undefined>();

  const handleReorder = (e: React.DragEvent<HTMLDivElement>) => {
    const button = e.currentTarget.querySelector('button');
    const newIdx = Number(button?.dataset.pageIdx);

    if (dragIdx !== undefined && newIdx !== undefined) {
      reorderPage(dragIdx, newIdx);
      setActivePage(newIdx);
    }

    setDragIdx(undefined);
  };

  return (
    <div className="flex">
      {pages.map((val, idx) => (
        <React.Fragment key={val.id}>
          {idx > 0 && <PageSeparator addPage={() => addPage(idx)} />}
          <Draggable onDragStart={() => setDragIdx(idx)} onDrop={handleReorder}>
            <PageButton
              {...val}
              active={idx === activePage}
              onClick={() => setActivePage(idx)}
              data-page-idx={idx}
            />
          </Draggable>
        </React.Fragment>
      ))}
      <Separator />
      <Button type="new" label="Add new" active onClick={() => addPage(pages.length)} />
    </div>
  );
}

export default Selector;
