import {
  CircleCheck,
  Clipboard,
  Copy,
  EllipsisVertical,
  FileText,
  Flag,
  Info,
  LucideIcon,
  PencilLine,
  Plus,
  Trash2,
} from 'lucide-react';

import { type PageType } from '@/hooks/use-pages';
import { tw } from '@/utils';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTitle,
  ContextMenuTrigger,
} from './context-menu';
import Draggable from './draggable';

const icons: Record<PageType, LucideIcon> = {
  info: Info,
  form: FileText,
  ending: CircleCheck,
  new: Plus,
};

function Button({
  type,
  label,
  active = true,
  ...props
}: {
  type: PageType;
  label: string;
  active?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>) {
  const isToggle = type !== 'new';
  const Icon = icons[type];

  return (
    <button
      className={tw(
        active
          ? 'text-foreground bg-background border-[0.5px] border-background-border focus:border-action-primary focus:outline-action-primary/25 focus:outline-[1.5px] basic-shadow'
          : 'text-foreground-muted bg-background-muted/15 hover:bg-background-muted/35',
        'relative px-[10px] py-1 flex shrink-0 items-center gap-[6px] rounded-lg text-sm cursor-pointer',
      )}
      {...props}
    >
      <Icon
        className={tw(
          active && isToggle ? 'stroke-orange' : 'stroke-foreground-icon',
          'size-[20px] p-[1px]',
        )}
      />
      {label}
      {active && isToggle && (
        <EllipsisVertical className="size-4 stroke-background-muted" />
      )}
    </button>
  );
}

function PageButton({
  onDragStart,
  onDrop,
  ...props
}: {
  onDragStart: React.DragEventHandler;
  onDrop: React.DragEventHandler;
} & Omit<React.ComponentProps<typeof Button>, 'onDragStart' | 'onDrop'>) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Draggable onDragStart={onDragStart} onDrop={onDrop}>
          <Button {...props} />
        </Draggable>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-60">
        <ContextMenuTitle>Settings</ContextMenuTitle>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Flag className="fill-action-primary stroke-action-primary" />
          Set as first page
        </ContextMenuItem>
        <ContextMenuItem>
          <PencilLine />
          Rename
        </ContextMenuItem>
        <ContextMenuItem>
          <Clipboard />
          Copy
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy />
          Duplicate
        </ContextMenuItem>
        <ContextMenuSeparator className="mx-3" />
        <ContextMenuItem variant="destructive">
          <Trash2 />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export { Button, PageButton };
