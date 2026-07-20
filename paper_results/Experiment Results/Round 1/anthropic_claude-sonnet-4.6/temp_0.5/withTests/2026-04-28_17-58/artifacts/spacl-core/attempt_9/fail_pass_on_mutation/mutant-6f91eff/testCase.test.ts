import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('accepts two-character literal segment with default version 1.1', () => {
    expect(() => new Matcher('/ab', '1.1')).not.toThrow()
  })
})