import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher malformed wildcard detection', () => {
  it('should reject a path where a wildcard is immediately followed by a non-slash character', () => {
    expect(() => Matcher.for('/+foo')).toThrow('Path contains malformed wildcards')
  })
})