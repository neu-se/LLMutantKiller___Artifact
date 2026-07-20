import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../src'

describe('Matcher', () => {
  it('accepts a valid literal path spec without throwing malformed wildcards error', () => {
    expect(() => new Matcher('/foo/bar')).not.toThrow()
  })
})