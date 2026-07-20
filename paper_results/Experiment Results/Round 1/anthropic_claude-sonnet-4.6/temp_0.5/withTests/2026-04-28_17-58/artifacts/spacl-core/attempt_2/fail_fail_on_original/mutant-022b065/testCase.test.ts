import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../src/matcher'

describe('Matcher trailing slash validation', () => {
  it('should throw for paths ending with slash', () => {
    expect(() => new Matcher('/foo/')).toThrow('Path must not end with a slash')
    expect(() => new Matcher('/foo/bar/')).toThrow('Path must not end with a slash')
    expect(() => new Matcher('/')).not.toThrow()
  })
})