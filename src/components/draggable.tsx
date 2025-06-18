'use client';

import { useState } from 'react';
import { tw } from '@/utils';

function Draggable({
  onDragStart,
  onDragEnd,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setDragging(true);
    onDragStart?.(e);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDragging(false);
    onDragEnd?.(e);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => e.preventDefault()}
      className={tw(dragging && 'opacity-35')}
      {...props}
    >
      {children}
    </div>
  );
}

export default Draggable;
