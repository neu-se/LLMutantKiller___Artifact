import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('throws an error with the message "Path contains empty segments" when a path has empty segments', () => {
    expect(() => {
      Matcher.for('//foo')
    }).toThrow('Path contains empty segments')
  })
})