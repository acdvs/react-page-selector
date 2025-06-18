import { cva } from 'class-variance-authority';
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
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from './context-menu';

const icons: Record<PageType, LucideIcon> = {
  info: Info,
  form: FileText,
  ending: CircleCheck,
  new: Plus,
};

const variants = cva(
  'relative px-3 py-2 flex shrink-0 items-center gap-2 rounded-xl border-1 cursor-pointer',
  {
    variants: {
      active: {
        false:
          'text-foreground-muted bg-background-muted border-transparent hover:bg-[#d9dce1]',
        true: 'text-black bg-white border-foreground-border focus:border-blue-500 focus:outline-2 focus:outline-blue-200',
      },
    },
  },
);

function Button({
  type,
  label,
  active,
  onClick,
  ...props
}: {
  type: PageType;
  label: string;
  active: boolean;
} & React.HTMLAttributes<HTMLButtonElement>) {
  const isToggle = type !== 'new';
  const Icon = icons[type];

  return (
    <button className={variants({ active })} onClick={onClick} {...props}>
      <Icon
        className={tw(
          active && isToggle ? 'stroke-orange' : 'stroke-[#8c93a1]',
          'w-[20px]',
        )}
      />
      {label}
      {active && isToggle && <EllipsisVertical className="stroke-[#9da4b2]" />}
    </button>
  );
}

function PageButton(props: React.ComponentProps<typeof Button>) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button {...props} />
      </ContextMenuTrigger>
      <ContextMenuContent className="absolute w-40">
        <ContextMenuLabel className="font-semibold text-md">Settings</ContextMenuLabel>
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
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2 />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export { Button, PageButton };
