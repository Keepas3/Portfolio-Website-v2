import {defineType, defineField} from 'sanity'

const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'resume',
      title: 'Resume PDF',
      type: 'file',
      options: {accept: '.pdf'},
      description: 'Upload your latest resume PDF here. The portfolio will serve this file automatically.',
    }),
    defineField({
      name: 'aboutHeadline',
      title: 'About - Headline',
      type: 'string',
      description: 'e.g. "Aspiring Software Developer & Engineer based in NYC"',
    }),
    defineField({
      name: 'aboutParagraphs',
      title: 'About - Paragraphs',
      type: 'array',
      of: [{type: 'text'}],
      description: 'Each item becomes one paragraph in the About Me section.',
    }),
    defineField({
      name: 'coreLanguages',
      title: 'Core Languages',
      type: 'string',
      description: 'Comma-separated list shown under "Core Languages", e.g. "Python, Java, C++"',
    }),
    defineField({
      name: 'projectsBuilt',
      title: 'Projects Built',
      type: 'string',
      description: 'The number shown above "Projects Built", e.g. "9+"',
    }),
  ],
})

export const schemaTypes = [siteSettings]
