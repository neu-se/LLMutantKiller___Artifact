import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('compiles /foo/++ to the correct regex source', () => {
    const matcher = new Matcher('/foo/++')
    expect(matcher.source).toBe('^\\/foo(?:\\/[^/]+)?$')
  })
})