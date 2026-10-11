import { type SchemaTypeDefinition } from 'sanity'
import { collectionTypes } from './collections'
import { objectTypes } from './objects'
import { pageTypes, singletonTypes } from './pages'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...objectTypes, ...pageTypes, ...collectionTypes],
}

/** Document types that exist exactly once (their _id equals their type name). */
export const singletonTypeNames: string[] = singletonTypes.map((t) => t.name).concat('timetable')
