import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('Matcher.for correctly rejects trailing slash specs', () => {
    expect(() => Matcher.for('/+')).not.toThrow()
    expect(() => Matcher.for('/+/')).toThrow('Path must not end with a slash')
  })
})