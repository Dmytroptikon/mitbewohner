import { CollectionConfig } from 'payload'
import { revalidatePage, revalidateDelete } from './hooks/revalidatePage';
import { Products } from '@/blocks/Products';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'blocks',
      type: 'blocks',
      required: true,
      blocks: [
        Products
      ],
    },
  ],
  
  // hooks: {
  //   afterChange: [revalidatePage],
  //   afterDelete: [revalidateDelete],
  // },
}
