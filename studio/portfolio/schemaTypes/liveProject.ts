import {defineType, defineField} from 'sanity'

export const liveProject = defineType({
  name: 'liveProject',
  title: 'Live Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on the card.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Live URL',
      type: 'url',
      description: 'Link to the deployed site or app.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail',
      type: 'image',
      description: 'Screenshot or preview image for the card.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Each entry becomes a pill badge on the card.',
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Use 1, 2, 3…',
      initialValue: 99,
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image'},
  },
})
