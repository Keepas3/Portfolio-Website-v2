import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'archiveProject',
  title: 'Archive Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. "2024" or "2024–2025"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'month',
      title: 'Month',
      type: 'string',
      description: 'Optional — shows as "Oct 2026" in the archive timeline.',
      options: {
        list: [
          { title: 'January', value: 'Jan' },
          { title: 'February', value: 'Feb' },
          { title: 'March', value: 'Mar' },
          { title: 'April', value: 'Apr' },
          { title: 'May', value: 'May' },
          { title: 'June', value: 'Jun' },
          { title: 'July', value: 'Jul' },
          { title: 'August', value: 'Aug' },
          { title: 'September', value: 'Sep' },
          { title: 'October', value: 'Oct' },
          { title: 'November', value: 'Nov' },
          { title: 'December', value: 'Dec' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'One or two sentences shown in the archive list.',
    }),
    defineField({
      name: 'tech',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add each technology as a separate tag.',
    }),
    defineField({
      name: 'link',
      title: 'Link (GitHub or Live)',
      type: 'url',
    }),
    defineField({
      name: 'onSite',
      title: 'Featured on Site',
      type: 'boolean',
      description: 'Toggle ON if this project already appears in the main Featured Projects section.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Use to sort by recency.',
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'year' },
  },
})
