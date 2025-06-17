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
    <div className={tw('w-6 flex items-center', className)}>
      <div className="w-full border-1 border-[#c0c0c0] border-dashed" />
      {children}
    </div>
  );
}

function PageSeparator({ addPage }: { addPage: () => void }) {
  return (
    <Separator className="hover:w-16 relative transition-[width] group">
      <button
        className="absolute left-1/2 -translate-x-1/2 cursor-pointer hidden group-hover:block"
        onClick={addPage}
      >
        <div className="bg-background rounded-full size-5 flex items-center justify-center border-1 border-foreground-border">
          <Plus className="w-[12px]" />
        </div>
      </button>
    </Separator>
  );
}

export { PageSeparator, Separator };
