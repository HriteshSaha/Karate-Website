import { defineArrayMember, defineField, defineType } from 'sanity'
import { iconOptions, imageField, stringField, textField } from './shared'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    stringField('eyebrow', 'Eyebrow', 'Small red label above the headline'),
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'text',
      rows: 2,
      description: 'Use a new line to break the headline.',
      validation: (r) => r.required(),
    }),
    stringField('accent', 'Highlighted headline (red)', 'Optional last line shown in red'),
    textField('text', 'Intro text'),
    stringField('ctaLabel', 'Button label', 'Button links to the free trial form'),
    imageField('image', 'Background image', 'Wide banner (roughly 3:1). Use the hotspot to choose the focus point.'),
  ],
  preview: { select: { title: 'title', media: 'image' } },
})

/** Eyebrow + heading + optional highlighted text + optional paragraph. */
export const sectionHeading = defineType({
  name: 'sectionHeading',
  title: 'Section heading',
  type: 'object',
  fields: [
    stringField('eyebrow', 'Eyebrow'),
    stringField('title', 'Heading'),
    stringField('accent', 'Highlighted text (red)'),
    textField('text', 'Intro text'),
  ],
  preview: { select: { title: 'title', subtitle: 'eyebrow' } },
})

export const iconCard = defineType({
  name: 'iconCard',
  title: 'Icon card',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
      options: { list: iconOptions },
      initialValue: 'star',
    }),
    stringField('title', 'Title'),
    textField('text', 'Text'),
  ],
  preview: { select: { title: 'title', subtitle: 'text' } },
})

export const stat = defineType({
  name: 'stat',
  title: 'Statistic',
  type: 'object',
  fields: [stringField('value', 'Value'), stringField('label', 'Label')],
  preview: { select: { title: 'value', subtitle: 'label' } },
})

export const linkItem = defineType({
  name: 'linkItem',
  title: 'Link',
  type: 'object',
  fields: [stringField('label', 'Label'), stringField('href', 'URL or path')],
  preview: { select: { title: 'label', subtitle: 'href' } },
})

export const hoursRow = defineType({
  name: 'hoursRow',
  title: 'Opening hours',
  type: 'object',
  fields: [stringField('days', 'Days'), stringField('time', 'Hours')],
  preview: { select: { title: 'days', subtitle: 'time' } },
})

export const formCard = defineType({
  name: 'formCard',
  title: 'Form card',
  type: 'object',
  fields: [
    stringField('eyebrow', 'Eyebrow'),
    stringField('title', 'Heading'),
    stringField('accent', 'Highlighted text (red)'),
    textField('text', 'Intro text'),
    defineField({
      name: 'perks',
      title: 'Checklist',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'eyebrow' } },
})

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery photo',
  type: 'object',
  fields: [
    imageField('image', 'Photo'),
    stringField('caption', 'Caption'),
    stringField('category', 'Category', 'Used for the filter buttons, e.g. Training, Ceremonies'),
  ],
  preview: { select: { title: 'caption', subtitle: 'category', media: 'image' } },
})

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'X (Twitter)', value: 'x' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'url',
      title: 'Link',
      type: 'url',
      description: 'The full address of your page, e.g. https://instagram.com/yourdojo',
      validation: (r) => r.required().uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: { select: { title: 'platform', subtitle: 'url' } },
})

export const mobileHero = defineType({
  name: 'mobileHero',
  title: 'Phone banner',
  type: 'object',
  description: 'The full-screen banner shown at the top of this page on phones. Desktop and tablet use the banner above.',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Text on top, photo below', value: 'textTop' },
          { title: 'Photo on top, text below', value: 'textBottom' },
        ],
        layout: 'radio',
      },
      initialValue: 'textTop',
    }),
    imageField('image', 'Photo', 'Portrait photo with a dark top or bottom edge. The focus point (hotspot) decides the crop.'),
    stringField('eyebrow', 'Small line (above, text-below layout)'),
    stringField('title', 'Headline (white)'),
    stringField('accent', 'Headline (red brush lettering)'),
    textField('text', 'Intro text', 3, 'In the "text below" layout, separate short words with | (e.g. Discipline | Confidence | Respect)'),
    stringField('primaryLabel', 'Main button label'),
    stringField('primaryHref', 'Main button link', 'e.g. /contact#trial'),
    stringField('secondaryLabel', 'Second button label (optional)'),
    stringField('secondaryHref', 'Second button link'),
    stringField('kanji', 'Decorative vertical text (optional)', 'e.g. 武道心'),
  ],
  preview: { select: { title: 'title', subtitle: 'accent', media: 'image' } },
})

export const objectTypes = [mobileHero, socialLink, hero, sectionHeading, iconCard, stat, linkItem, hoursRow, formCard, galleryItem]
