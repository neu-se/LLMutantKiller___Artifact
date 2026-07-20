import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../src/matcher'

describe('Matcher wildcard validation', () => {
  it('should accept a valid path with a wildcard followed by a slash', () => {
    expect(() => Matcher.for('/foo/*/bar')).not.toThrow()
  })
})