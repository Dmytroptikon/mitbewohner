import { GlobalConfig } from 'payload'

const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoDesctop',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      name: 'languageSwitcher',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'locale', type: 'text', localized: true },
      ],
    },
    {
      name: 'mobileMenu',
      type: 'array',
      label: 'Mobile Menu',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Text',
          localized: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
        },
      ],
    },
  ],
}

export default Header
