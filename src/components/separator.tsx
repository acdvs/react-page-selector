'use client';

import { Plus } from 'lucide-react';
import { tw } from '@/utils';

function Separator({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={tw('w-5 flex items-center', className)}>
      <div className="w-full border-1 border-foreground-border border-dashed" />
      {children}
    </div>
  );
}

function PageSeparator({ addPage }: { addPage: () => void }) {
  return (
    <Separator className="hover:w-14 relative transition-[width] group">
      <button
        className="absolute left-1/2 -translate-x-1/2 cursor-pointer bg-background rounded-full size-4 justify-center items-center border-[0.5px] border-background-border basic-shadow hidden group-hover:flex"
        onClick={addPage}
      >
        <Plus className="size-2" />
      </button>
    </Separator>
  );
}

export { PageSeparator, Separator };
