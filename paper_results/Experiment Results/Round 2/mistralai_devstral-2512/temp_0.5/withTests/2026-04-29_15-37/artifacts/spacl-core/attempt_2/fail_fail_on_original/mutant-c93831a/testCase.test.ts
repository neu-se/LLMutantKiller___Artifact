import { Matcher } from '../../src/matcher'
import { describe, it, expect } from '@jest/globals'

describe('Matcher trailing slash handling', () => {
  it('should not match paths ending with a trailing slash', () => {
    const matcher = Matcher.for('/foo')
    const result = '/foo/'.match(matcher)
    expect(result).toBeNull()
  })
})