import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher constructor', () => {
  it('throws an error with the correct message when path ends with a slash', () => {
    expect(() => new Matcher('/foo/')).toThrow('Path must not end with a slash')
  })
})