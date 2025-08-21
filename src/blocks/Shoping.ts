import type { Block } from 'payload';

export const Shoping: Block = {
  slug: 'shoping',
  labels: {
    singular: 'Shoping Block',
    plural: 'Shoping Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'criticalTitle',
      type: 'text',
    },
    {
      name: 'optionTitle',
      type: 'text',
    },
  ],
};