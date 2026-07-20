import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('throws an error with message "Path contains empty segments" when path has empty segments', () => {
    expect(() => new Matcher('//')).toThrow('Path contains empty segments')
  })
})