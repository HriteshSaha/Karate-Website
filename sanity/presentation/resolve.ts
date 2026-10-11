import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation'

type Location = { title: string; href: string }
const fixed = (...locations: Location[]) =>
  defineLocations({ select: { id: '_id' }, resolve: () => ({ locations }) })
const page = (title: string, href: string) => fixed({ title, href })

/** Tells the Studio which website pages each document appears on ("Used on" links + navigation). */
export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    siteSettings: fixed({ title: 'Home', href: '/' }, { title: 'Contact', href: '/contact' }),
    contactInfo: fixed({ title: 'Contact page', href: '/contact' }, { title: 'Footer (any page)', href: '/' }),
    homePage: page('Home', '/'),
    aboutPage: page('About', '/about'),
    programsPage: page('Programs', '/programs'),
    instructorsPage: page('Instructors', '/instructors'),
    schedulePage: page('Home (schedule popup)', '/#schedule'),
    galleryPage: page('Gallery', '/gallery'),
    alumniPage: page('Alumni', '/alumni'),
    contactPage: page('Contact', '/contact'),
    program: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Program', href: `/programs#${doc?.slug ?? ''}` },
          { title: 'Home', href: '/' },
        ],
      }),
    }),
    instructor: defineLocations({
      select: { name: 'name' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.name || 'Instructor', href: '/instructors' },
          { title: 'About', href: '/about' },
        ],
      }),
    }),
    alumnus: fixed({ title: 'Alumni', href: '/alumni' }, { title: 'Home', href: '/' }),
    beltLevel: fixed({ title: 'Alumni', href: '/alumni' }),
    certification: fixed({ title: 'About', href: '/about' }),
    faq: fixed({ title: 'Contact', href: '/contact' }),
    timetable: fixed({ title: 'Schedule popup', href: '/#schedule' }),
    classType: fixed({ title: 'Schedule popup', href: '/#schedule' }),
    legalPage: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Legal page', href: `/${doc?.slug ?? ''}` }],
      }),
    }),
  },
}
