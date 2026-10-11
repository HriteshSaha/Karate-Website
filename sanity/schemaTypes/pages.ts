import { defineArrayMember, defineField, defineType } from 'sanity'
import { imageField, stringField, stringList, textField } from './shared'

/** Singleton documents. Their _id is the same as their type name. */

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Brand', default: true },
    { name: 'navigation', title: 'Navigation & footer' },
    { name: 'cta', title: 'Call-to-action band' },
  ],
  fields: [
    defineField({ ...stringField('name', 'Academy name'), group: 'brand', validation: (r) => r.required() }),
    defineField({ ...stringField('shortName', 'Short name', 'Shown in the header logo'), group: 'brand' }),
    defineField({ ...stringField('tagline', 'Tagline'), group: 'brand' }),
    defineField({ ...textField('description', 'Site description', 3, 'Used by search engines'), group: 'brand' }),
    defineField({ ...stringField('logoMark', 'Logo character', 'Used when no logo image is set (e.g. 改)'), group: 'brand' }),
    defineField({ ...imageField('logo', 'Logo image', 'Optional. Replaces the circular character mark.'), group: 'brand' }),
    defineField({ ...imageField('ogImage', 'Social share image', 'Shown when the site is shared on social media'), group: 'brand' }),
    defineField({
      name: 'stats',
      title: 'Key numbers',
      type: 'array',
      of: [defineArrayMember({ type: 'stat' })],
      group: 'brand',
    }),
    defineField({ name: 'achievement', title: 'Achievement highlight', type: 'stat', group: 'brand' }),

    defineField({ name: 'nav', title: 'Main navigation', type: 'array', of: [defineArrayMember({ type: 'linkItem' })], group: 'navigation' }),
    defineField({ ...stringField('headerCtaLabel', 'Header button label'), group: 'navigation' }),
    defineField({ ...textField('footerBlurb', 'Footer blurb'), group: 'navigation' }),

    defineField({ ...stringField('ctaEyebrow', 'Eyebrow'), group: 'cta' }),
    defineField({ ...stringField('ctaTitle', 'Heading'), group: 'cta' }),
    defineField({ ...textField('ctaText', 'Text', 2), group: 'cta' }),
    defineField({ ...stringField('ctaButtonLabel', 'Button label'), group: 'cta' }),
    defineField({ ...stringList('ctaPerks', 'Checklist'), group: 'cta' }),
    defineField({ ...imageField('ctaImage', 'Background image'), group: 'cta' }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})

/** Phone, email, address, opening hours and social links — shown in the footer and on the Contact page. */
export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact info & social links',
  type: 'document',
  groups: [
    { name: 'details', title: 'Contact details', default: true },
    { name: 'hours', title: 'Opening hours' },
    { name: 'social', title: 'Social media' },
    { name: 'labels', title: 'Labels' },
  ],
  fields: [
    defineField({ ...stringField('phone', 'Phone (as shown)', 'e.g. (951) 123-4567'), group: 'details' }),
    defineField({ ...stringField('phoneLink', 'Phone (dial link)', 'Digits with country code, used when someone taps the number — e.g. +19511234567'), group: 'details' }),
    defineField({ ...stringField('phoneNote', 'Note under the phone', 'e.g. Mon – Fri, 9am – 8pm'), group: 'details' }),
    defineField({ ...stringField('email', 'Email'), group: 'details' }),
    defineField({ ...stringField('emailNote', 'Note under the email', "e.g. We'll respond within 1 hour"), group: 'details' }),
    defineField({ ...stringList('addressLines', 'Address', 'One line per item'), group: 'details' }),
    defineField({ ...stringField('mapsUrl', 'Google Maps link', 'Opens when someone taps the address or "Get directions"'), group: 'details' }),
    defineField({ name: 'hours', title: 'Opening hours', type: 'array', of: [defineArrayMember({ type: 'hoursRow' })], group: 'hours' }),
    defineField({
      name: 'socials',
      title: 'Social media links',
      type: 'array',
      of: [defineArrayMember({ type: 'socialLink' })],
      description: 'Shown as icons in the footer. Drag to reorder; remove any you don\'t use.',
      group: 'social',
    }),
    defineField({ ...stringField('callLabel', 'Label: phone'), group: 'labels' }),
    defineField({ ...stringField('emailLabel', 'Label: email'), group: 'labels' }),
    defineField({ ...stringField('visitLabel', 'Label: address'), group: 'labels' }),
    defineField({ ...stringField('hoursLabel', 'Label: opening hours'), group: 'labels' }),
    defineField({ ...stringField('directionsLabel', 'Label: directions link'), group: 'labels' }),
    defineField({ ...stringField('footerLinksHeading', 'Footer heading: links'), group: 'labels' }),
    defineField({ ...stringField('footerContactHeading', 'Footer heading: contact'), group: 'labels' }),
    defineField({ ...stringField('footerFollowHeading', 'Footer heading: social media'), group: 'labels' }),
  ],
  preview: { prepare: () => ({ title: 'Contact info & social links' }) },
})

const page = (name: string, title: string, fields: ReturnType<typeof defineField>[] = []) =>
  defineType({
    name,
    title,
    type: 'document',
    fields: [defineField({ name: 'hero', title: 'Hero', type: 'hero' }), ...fields],
    preview: { prepare: () => ({ title }) },
  })

const section = (name: string, title: string) => defineField({ name, title, type: 'sectionHeading' })

export const homePage = page('homePage', 'Home page', [
  defineField({ name: 'mobileHero', title: 'Phone banner', type: 'mobileHero' }),
  defineField({
    name: 'secondaryCtaLabel',
    title: 'Hero second button label',
    type: 'string',
  }),
  defineField({ name: 'highlights', title: 'Highlights strip', type: 'array', of: [defineArrayMember({ type: 'iconCard' })] }),
  stringList('marqueeWords', 'Scrolling words band', 'Short words shown in the red band under the highlights'),
  section('programsSection', 'Programs section heading'),
  section('instructorsSection', 'Instructors section heading'),
  section('scheduleSection', 'Schedule section heading'),
  section('alumniSection', 'Alumni section heading'),
  stringField('alumniButtonLabel', 'Alumni "view more" button label'),
  stringField('scheduleButtonLabel', 'Schedule button label'),
  section('gallerySection', 'Gallery section heading'),
  stringField('galleryButtonLabel', 'Gallery "view all" button label'),
])

export const aboutPage = page('aboutPage', 'About page', [
  defineField({ name: 'mobileHero', title: 'Phone banner', type: 'mobileHero' }),
  section('storySection', 'Story heading'),
  defineField({ name: 'storyParagraphs', title: 'Story paragraphs', type: 'array', of: [defineArrayMember({ type: 'text' })] }),
  imageField('storyImage', 'Story image'),
  stringField('storyQuote', 'Story image quote'),
  section('valuesSection', 'Mission & values heading'),
  defineField({ name: 'values', title: 'Mission, vision & values', type: 'array', of: [defineArrayMember({ type: 'iconCard' })] }),
  section('whySection', '"Why families choose us" heading'),
  section('certificationsSection', 'Certifications heading'),
  defineField({ name: 'why', title: 'Reasons', type: 'array', of: [defineArrayMember({ type: 'iconCard' })] }),
])

export const programsPage = page('programsPage', 'Programs page', [stringField('programCtaLabel', 'Program button label')])
export const instructorsPage = page('instructorsPage', 'Instructors page')
/** The schedule opens as a popup, so it has no banner. */
export const schedulePage = defineType({
  name: 'schedulePage',
  title: 'Schedule popup',
  type: 'document',
  fields: [
    defineField({ name: 'tableSection', title: 'Popup heading', type: 'sectionHeading' }),
    textField('note', 'Note under the timetable'),
  ],
  preview: { prepare: () => ({ title: 'Schedule popup' }) },
})

export const galleryPage = page('galleryPage', 'Gallery page', [
  section('introSection', 'Intro above the photos'),
  stringField('categoriesLabel', 'Label of the "show everything" filter', 'e.g. All'),
  defineField({
    name: 'items',
    title: 'Photos',
    type: 'array',
    of: [defineArrayMember({ type: 'galleryItem' })],
    description: 'Drag to reorder. The first photos also appear on the home page.',
  }),
])
export const alumniPage = page('alumniPage', 'Alumni page', [
  defineField({ name: 'mobileHero', title: 'Phone banner', type: 'mobileHero' }),
  section('introSection', 'Intro above the belt sliders'),
])

export const contactPage = page('contactPage', 'Contact page', [
  defineField({ name: 'trialForm', title: 'Free trial form', type: 'formCard' }),
  stringField('trialSubmitLabel', 'Trial form button label'),
  textField('trialSuccess', 'Trial form success message'),
  defineField({ name: 'callbackForm', title: 'Call-back form', type: 'formCard' }),
  stringField('callbackSubmitLabel', 'Call-back button label'),
  textField('callbackSuccess', 'Call-back success message'),
  section('whyReachSection', '"Why reach out" heading'),
  defineField({ name: 'whyReach', title: 'Reasons to get in touch', type: 'array', of: [defineArrayMember({ type: 'iconCard' })] }),
  section('faqSection', 'FAQ heading'),
  section('alumniSection', 'Alumni teaser heading'),
  stringList('ageGroups', 'Form option: age groups'),
  stringList('programOptions', 'Form option: programs'),
  stringList('experienceLevels', 'Form option: experience levels'),
  stringList('classTimes', 'Form option: class times'),
  stringList('callTimes', 'Form option: best time to call'),
])

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Legal page',
  type: 'document',
  fields: [
    stringField('title', 'Title'),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, description: 'privacy or terms' }),
    textField('body', 'Content', 12, 'Separate paragraphs with a blank line.'),
  ],
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
})

export const singletonTypes = [
  siteSettings,
  contactInfo,
  homePage,
  aboutPage,
  programsPage,
  instructorsPage,
  schedulePage,
  galleryPage,
  alumniPage,
  contactPage,
]
export const pageTypes = [...singletonTypes, legalPage]
