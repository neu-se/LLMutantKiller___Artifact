import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('accepts valid path /foo/bar without throwing malformed wildcards error', () => {
    expect(() => Matcher.for('/foo/bar')).not.toThrow()
  })
})