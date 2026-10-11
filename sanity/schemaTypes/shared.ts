import { defineField } from 'sanity'

export const iconOptions = [
  'award',
  'chart',
  'book',
  'dumbbell',
  'eye',
  'heart',
  'home',
  'shield',
  'star',
  'target',
  'trophy',
  'users',
].map((value) => ({ title: value[0].toUpperCase() + value.slice(1), value }))

/** Image with hotspot (controls how it is cropped) and alt text. */
export const imageField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: 'image',
    description,
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt text',
        type: 'string',
        description: 'Short description for screen readers. Leave empty for decorative images.',
      }),
    ],
  })

export const stringField = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: 'string', description })

export const textField = (name: string, title: string, rows = 3, description?: string) =>
  defineField({ name, title, type: 'text', rows, description })

export const stringList = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: 'array', of: [{ type: 'string' }], description })
