import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('accepts valid literal path with version 1 without throwing malformed wildcards error', () => {
    expect(() => new Matcher('/foo', '1')).not.toThrow()
  })
})