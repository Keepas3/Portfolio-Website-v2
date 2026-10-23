import {defineType, defineField} from 'sanity'
import {liveProject} from './liveProject'
import certification from './certification'
import archiveProject from './archiveProject'

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
      name: 'resumeLabel',
      title: 'Resume Label (internal only)',
      type: 'string',
      description: 'Reminder for yourself — e.g. "SWE Resume", "AI/ML Resume", "IT Support Resume". Not shown on the site.',
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
      name: 'projectsBuilt',
      title: 'Projects Built (stat counter)',
      type: 'string',
      description: 'Number shown on the stat counter, e.g. "20+"',
    }),
    defineField({
      name: 'languagesCount',
      title: 'Languages (stat counter)',
      type: 'string',
      description: 'Number shown on the stat counter, e.g. "8+"',
    }),
    defineField({
      name: 'techToolsCount',
      title: 'Tech Tools (stat counter)',
      type: 'string',
      description: 'Number shown on the stat counter, e.g. "16+"',
    }),
  ],
})

export const schemaTypes = [siteSettings, liveProject, certification, archiveProject]
