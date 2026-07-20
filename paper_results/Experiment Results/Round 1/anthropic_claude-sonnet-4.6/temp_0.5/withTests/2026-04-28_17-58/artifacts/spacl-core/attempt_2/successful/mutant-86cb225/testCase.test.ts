import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher wildcard validation in version 1', () => {
  it('should accept a valid literal path spec in version 1 without throwing', () => {
    expect(() => new Matcher('/foo', '1')).not.toThrow()
  })
})