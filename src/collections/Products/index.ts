import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'units',
      type: 'text',
      required: true,
    },
    {
      name: 'quantity',
      type: 'number',
      required: true,
    },
    {
      name: 'limit',
      type: 'number',
      required: true,
    },
    {
      name: 'critical',
      type: 'number',
      required: true,
    },
  ],
}
