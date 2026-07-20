import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher wildcard validation', () => {
  it('should accept a valid path with wildcard followed by slash separator', () => {
    expect(() => Matcher.for('/foo/*/bar')).not.toThrow()
  })
})