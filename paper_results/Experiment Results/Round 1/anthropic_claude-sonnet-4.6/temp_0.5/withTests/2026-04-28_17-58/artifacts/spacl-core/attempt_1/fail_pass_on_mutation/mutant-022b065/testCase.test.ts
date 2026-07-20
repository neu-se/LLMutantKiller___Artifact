import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher trailing slash validation', () => {
  it('should throw an error for a path ending with a slash but accept the root path', () => {
    // The root path "/" should be accepted (not end with slash in the sense of having content before slash)
    expect(() => new Matcher('/')).not.toThrow()
    // A path ending with slash should throw
    expect(() => new Matcher('/foo/')).toThrow('Path must not end with a slash')
  })
})