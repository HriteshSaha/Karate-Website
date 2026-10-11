import { defineArrayMember, defineField, defineType } from 'sanity'
import { imageField, stringField, stringList, textField } from './shared'

const order = defineField({
  name: 'order',
  title: 'Display order',
  type: 'number',
  description: 'Lower numbers appear first.',
  initialValue: 100,
})

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    stringField('title', 'Title'),
    defineField({
      name: 'slug',
      title: 'Anchor / slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    stringField('ages', 'Age range', 'e.g. Ages 4–12'),
    textField('blurb', 'Short description', 2, 'Shown on the program cards'),
    textField('detail', 'Full description', 4, 'Shown on the Programs page'),
    imageField('image', 'Image'),
    stringList('benefits', 'Benefits'),
    order,
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'ages', media: 'image' } },
})

export const instructor = defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    stringField('name', 'Name'),
    stringField('role', 'Role'),
    stringField('rank', 'Rank', 'e.g. 5th Dan Black Belt'),
    stringField('experience', 'Experience', 'e.g. 15+ Years Experience'),
    stringField('focus', 'Specializes in'),
    textField('bio', 'Bio', 4),
    imageField('photo', 'Photo', 'A PNG with a transparent background (cut-out) looks best — the instructor then steps out of the card. Regular photos are faded into the card. Until a photo is added, a placeholder karate figure is shown.'),
    defineField({
      name: 'cutout',
      title: 'Photo has a transparent background (cut-out)',
      type: 'boolean',
      description: 'On: the instructor steps out of the card, like the sample. Off: a regular photo, faded into the card.',
      initialValue: true,
    }),
    order,
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
})

export const beltColors = ['white', 'yellow', 'orange', 'green', 'blue', 'purple', 'brown', 'black']

export const beltLevel = defineType({
  name: 'beltLevel',
  title: 'Belt level',
  type: 'document',
  description: 'A section of the Alumni page. Alumni are grouped by belt level.',
  fields: [
    stringField('title', 'Title', 'e.g. Green Belt'),
    defineField({
      name: 'slug',
      title: 'Anchor / slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'color',
      title: 'Belt colour',
      type: 'string',
      options: { list: beltColors.map((value) => ({ title: value[0].toUpperCase() + value.slice(1), value })) },
      initialValue: 'white',
    }),
    textField('description', 'Short description', 2, 'Shown above the slider for this belt'),
    order,
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'color' } },
})

export const alumnus = defineType({
  name: 'alumnus',
  title: 'Alumni member',
  type: 'document',
  fields: [
    stringField('name', 'Name'),
    defineField({
      name: 'beltLevel',
      title: 'Belt level',
      type: 'reference',
      to: [{ type: 'beltLevel' }],
      description: 'The highest belt they earned with us. Decides which slider they appear in.',
      validation: (r) => r.required(),
    }),
    stringField('classOf', 'Class of', 'e.g. Class of 2019'),
    stringField('headline', 'Headline', 'e.g. Software engineer · Black belt 2nd Dan'),
    textField('story', 'Story / quote', 4),
    imageField('photo', 'Photo', 'Square or portrait works best. Without a photo, initials are shown.'),
    defineField({
      name: 'featured',
      title: 'Show on the home page',
      type: 'boolean',
      initialValue: false,
    }),
    order,
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'classOf', media: 'photo' } },
})

export const certification = defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    stringField('title', 'Certification', 'e.g. First aid and CPR trained'),
    stringField('issuer', 'Issued by'),
    stringField('year', 'Year / status', 'e.g. Since 2011, Renewed yearly'),
    textField('details', 'Details', 4, 'Shown when a visitor opens the card'),
    imageField('badge', 'Badge or logo (optional)', 'Shown instead of the default icon'),
    order,
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'issuer', media: 'badge' } },
})

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [stringField('question', 'Question'), textField('answer', 'Answer', 4), order],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'question', subtitle: 'answer' } },
})

export const classType = defineType({
  name: 'classType',
  title: 'Class type',
  type: 'document',
  description: 'A kind of class that can be placed on the timetable.',
  fields: [
    stringField('title', 'Title', 'e.g. Kids Karate'),
    defineField({
      name: 'color',
      title: 'Timetable colour',
      type: 'string',
      options: {
        list: ['emerald', 'violet', 'amber', 'sky', 'rose', 'zinc'].map((value) => ({
          title: value[0].toUpperCase() + value.slice(1),
          value,
        })),
      },
      initialValue: 'zinc',
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'color' } },
})

const dayField = (name: string, title: string) =>
  defineField({ name, title, type: 'reference', to: [{ type: 'classType' }] })

export const timetableRow = defineType({
  name: 'timetableRow',
  title: 'Timetable row',
  type: 'object',
  fields: [
    stringField('time', 'Time', 'e.g. 4:00 PM'),
    dayField('monday', 'Monday'),
    dayField('tuesday', 'Tuesday'),
    dayField('wednesday', 'Wednesday'),
    dayField('thursday', 'Thursday'),
    dayField('friday', 'Friday'),
  ],
  preview: { select: { title: 'time' } },
})

export const timetable = defineType({
  name: 'timetable',
  title: 'Class timetable',
  type: 'document',
  fields: [
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [defineArrayMember({ type: 'timetableRow' })],
    }),
  ],
  preview: { prepare: () => ({ title: 'Class timetable' }) },
})

export const collectionTypes = [program, instructor, beltLevel, alumnus, certification, faq, classType, timetableRow, timetable]
