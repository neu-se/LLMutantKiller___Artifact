import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('accepts valid path /foo with version 1', () => {
    expect(() => new Matcher('/foo', '1')).not.toThrow()
  })
})