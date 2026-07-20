import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('throws an error with the message "Path contains malformed captures" when path has malformed captures', () => {
    expect(() => new Matcher('/foo:')).toThrow('Path contains malformed captures')
  })
})