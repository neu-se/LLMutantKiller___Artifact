import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher wildcard validation', () => {
  it('should accept a valid path spec where wildcard segment is followed by a slash and another segment', () => {
    expect(() => Matcher.for('/foo/*/bar')).not.toThrow()
  })
})