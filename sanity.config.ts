'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema, singletonTypeNames} from './sanity/schemaTypes'
import {resolve} from './sanity/presentation/resolve'
import {structure} from './sanity/structure'

const singletons = new Set(singletonTypeNames)

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    ...schema,
    // Singletons can't be created from the "new document" menu
    templates: (templates) => templates.filter(({schemaType}) => !singletons.has(schemaType)),
  },
  document: {
    // Singletons can't be duplicated or deleted
    actions: (input, {schemaType}) =>
      singletons.has(schemaType)
        ? input.filter(({action}) => action && !['duplicate', 'delete', 'unpublish'].includes(action))
        : input,
  },
  plugins: [
    // Live preview: the website inside the Studio, with click-to-edit
    presentationTool({
      resolve,
      previewUrl: {
        initial: '/',
        previewMode: {enable: '/api/draft-mode/enable'},
      },
    }),
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
