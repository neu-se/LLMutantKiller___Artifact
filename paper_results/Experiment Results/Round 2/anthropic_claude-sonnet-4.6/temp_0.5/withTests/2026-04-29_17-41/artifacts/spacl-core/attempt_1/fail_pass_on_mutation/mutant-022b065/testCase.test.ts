import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher trailing slash validation', () => {
  it('should throw an error for a path spec that ends with a trailing slash', () => {
    expect(() => new Matcher('/foo/')).toThrow('Path must not end with a slash')
    expect(() => new Matcher('/foo/bar/')).toThrow('Path must not end with a slash')
    expect(() => new Matcher('/+/')).toThrow('Path must not end with a slash')
  })
})