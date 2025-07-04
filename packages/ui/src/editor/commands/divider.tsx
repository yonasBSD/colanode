import { SeparatorHorizontal } from 'lucide-react';

import { EditorCommand } from '@colanode/client/types';

export const DividerCommand: EditorCommand = {
  key: 'divider',
  name: 'Divider',
  description: 'Insert a divider',
  keywords: ['divider', 'break', 'hr'],
  icon: SeparatorHorizontal,
  disabled: false,
  handler: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setHorizontalRule().run();
  },
};
