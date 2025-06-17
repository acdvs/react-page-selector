import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Only including page types relevant to the Figma file.
export type PageType = 'info' | 'form' | 'ending' | 'new';

type Page = {
  id: string;
  type: PageType;
  label: string;
};

const data: Page[] = [
  {
    id: uuidv4(),
    type: 'info',
    label: 'Info',
  },
  {
    id: uuidv4(),
    type: 'form',
    label: 'Details',
  },
  {
    id: uuidv4(),
    type: 'form',
    label: 'Other',
  },
  {
    id: uuidv4(),
    type: 'ending',
    label: 'Ending',
  },
];

function usePages() {
  // Load page data here in a full app.

  const [pages, setPages] = useState(data);

  const addPage = (idx: number) => {
    // Get type and label from dialog in a full app.
    const newPage = {
      id: uuidv4(),
      type: 'form' as PageType,
      label: 'New page',
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

  return { pages, addPage, reorderPage } as const;
}

export default usePages;
