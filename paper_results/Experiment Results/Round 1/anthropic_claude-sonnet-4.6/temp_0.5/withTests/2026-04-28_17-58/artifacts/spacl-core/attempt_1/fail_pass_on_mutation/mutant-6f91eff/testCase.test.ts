import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('accepts valid literal path segments without throwing malformed wildcards error', () => {
    expect(() => Matcher.for('/foo')).not.toThrow()
    expect(Matcher.for('/foo').spec).toBe('/foo')
  })
})