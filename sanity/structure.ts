import type { StructureBuilder, StructureResolver } from 'sanity/structure'

const single = (S: StructureBuilder, type: string, title: string) =>
  S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type).title(title))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      single(S, 'siteSettings', 'Site settings'),
      single(S, 'contactInfo', 'Contact info & social links'),
      S.divider(),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              single(S, 'homePage', 'Home'),
              single(S, 'programsPage', 'Programs'),
              single(S, 'aboutPage', 'About'),
              single(S, 'instructorsPage', 'Instructors'),
              single(S, 'galleryPage', 'Gallery'),
              single(S, 'schedulePage', 'Schedule popup'),
              single(S, 'alumniPage', 'Alumni'),
              single(S, 'contactPage', 'Contact'),
              S.documentTypeListItem('legalPage').title('Legal pages'),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('program').title('Programs'),
      S.documentTypeListItem('instructor').title('Instructors'),
      S.documentTypeListItem('alumnus').title('Alumni'),
      S.documentTypeListItem('beltLevel').title('Belt levels'),
      S.documentTypeListItem('certification').title('Certifications'),
      S.documentTypeListItem('faq').title('FAQs'),
      S.divider(),
      S.documentTypeListItem('classType').title('Class types'),
      single(S, 'timetable', 'Class timetable'),
    ])
