import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher trailing slash validation', () => {
  it('should not throw trailing slash error for root path and should throw for paths with trailing slash', () => {
    // Root path should be valid
    expect(() => new Matcher('/')).not.toThrow()
    // These should throw due to trailing slash
    expect(() => new Matcher('/foo/')).toThrow('Path must not end with a slash')
    expect(() => new Matcher('/foo/bar/')).toThrow('Path must not end with a slash')
  })
})