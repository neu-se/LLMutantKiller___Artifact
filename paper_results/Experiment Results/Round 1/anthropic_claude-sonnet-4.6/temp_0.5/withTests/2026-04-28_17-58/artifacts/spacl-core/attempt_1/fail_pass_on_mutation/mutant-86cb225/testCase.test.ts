import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher malformed wildcard detection in version 1', () => {
  it('should reject a path with adjacent wildcards like /+* in version 1', () => {
    expect(() => new Matcher('/+*', '1')).toThrow('Path contains malformed wildcards')
  })
})