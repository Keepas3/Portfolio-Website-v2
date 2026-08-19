import {defineType, defineField} from 'sanity'

const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'resume',
      title: 'Resume PDF',
      type: 'file',
      options: {accept: '.pdf'},
      description: 'Upload your latest resume PDF here. The portfolio will serve this file automatically.',
    }),
  ],
})

export const schemaTypes = [siteSettings]
