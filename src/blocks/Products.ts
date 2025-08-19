import type { Block } from 'payload';

export const Products: Block = {
  slug: 'products',
  labels: {
    singular: 'Products Block',
    plural: 'Products Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
};