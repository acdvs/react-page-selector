import { useState } from 'react';

// Only including page types relevant to the Figma file.
export type PageType = 'info' | 'form' | 'ending' | 'new';

type Page = {
  id: string;
  type: PageType;
  label: string;
  active: boolean;
};

const data: Page[] = [
  {
    id: '1',
    type: 'info',
    label: 'Info',
    active: false,
  },
  {
    id: '2',
    type: 'form',
    label: 'Details',
    active: false,
  },
  {
    id: '3',
    type: 'form',
    label: 'Other',
    active: false,
  },
  {
    id: '4',
    type: 'ending',
    label: 'Ending',
    active: false,
  },
];

function usePages() {
  // Load page data here in a full app.

  const [pages, setPages] = useState(data);

  const setActivePage = (idx: number) => {
    setPages((curr) => {
      const copy = [...curr];
      const oldIdx = copy.findIndex((x) => x.active);

      if (oldIdx >= 0) {
        copy[oldIdx].active = false;
      }
      copy[idx].active = true;

      return copy;
    });
  };

  const addPage = (idx: number) => {
    // Get type and label from dialog in a full app.
    const newPage = {
      id: pages.length.toString(),
      type: 'form' as PageType,
      label: 'New page',
      active: false,
    };

    setPages((curr) => curr.toSpliced(idx, 0, newPage));
  };

  const reorderPage = (oldIdx: number, newIdx: number) => {
    // console.log({ oldIdx, newIdx });
    setPages((curr) => {
      const page = curr[oldIdx];
      const deleted = curr.toSpliced(oldIdx, 1);
      const added = deleted.toSpliced(newIdx, 0, page);

      return added;
    });
  };

  return { pages, addPage, reorderPage, setActivePage } as const;
}

export default usePages;
