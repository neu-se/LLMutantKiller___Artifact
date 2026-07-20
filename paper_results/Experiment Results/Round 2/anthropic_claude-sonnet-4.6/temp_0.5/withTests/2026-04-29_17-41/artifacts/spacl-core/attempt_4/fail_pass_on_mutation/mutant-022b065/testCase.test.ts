import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('validates trailing slashes correctly for all edge cases', () => {
    // These should be accepted (no trailing slash)
    expect(() => new Matcher('/')).not.toThrow()
    expect(() => new Matcher('/foo')).not.toThrow()
    expect(() => new Matcher('/foo/bar')).not.toThrow()
    
    // These should be rejected (trailing slash)
    expect(() => new Matcher('/foo/')).toThrow('Path must not end with a slash')
    expect(() => new Matcher('/foo/bar/')).toThrow('Path must not end with a slash')
  })
})