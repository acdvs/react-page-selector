'use client';

import React, { useState } from 'react';

import usePages from '@/hooks/use-pages';
import { Button, PageButton } from './button';
import { PageSeparator, Separator } from './separator';

export function Selector() {
  const { pages, setActivePage, addPage, reorderPage } = usePages();
  const [dragIdx, setDragIdx] = useState<number | undefined>();

  const handleReorder = (e: React.DragEvent<HTMLDivElement>) => {
    const button = e.currentTarget.querySelector('button');
    const newIdx = Number(button?.dataset.pageIdx);

    if (dragIdx !== undefined && newIdx !== undefined) {
      reorderPage(dragIdx, newIdx);
    }

    setDragIdx(undefined);
  };

  return (
    <div className="flex">
      {pages.map((val, idx) => (
        <React.Fragment key={val.id}>
          {idx > 0 && <PageSeparator addPage={() => addPage(idx)} />}
          <PageButton
            {...val}
            onClick={() => setActivePage(idx)}
            onDragStart={() => setDragIdx(idx)}
            onDrop={handleReorder}
            data-page-idx={idx}
          />
        </React.Fragment>
      ))}
      <Separator />
      <Button type="new" label="Add new" onClick={() => addPage(pages.length)} />
    </div>
  );
}

export default Selector;
