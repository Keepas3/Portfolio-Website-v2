import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Certification Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "AWS Cloud Practitioner" or "CompTIA A+"',
    }),
    defineField({
      name: 'issuer',
      title: 'Issuing Organization',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "Amazon Web Services" or "CompTIA"',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {list: ['Earned', 'In Progress']},
      initialValue: 'Earned',
    }),
    defineField({
      name: 'dateEarned',
      title: 'Date Earned',
      type: 'date',
      description: 'Leave blank if In Progress',
    }),
    defineField({
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'date',
      description: 'Leave blank if the cert does not expire',
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Credential URL',
      type: 'url',
      description: 'Link to verify the credential (Credly, Coursera, etc.)',
    }),
    defineField({
      name: 'badgeImage',
      title: 'Badge Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Official certification badge image',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 99,
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'issuer'},
  },
})
