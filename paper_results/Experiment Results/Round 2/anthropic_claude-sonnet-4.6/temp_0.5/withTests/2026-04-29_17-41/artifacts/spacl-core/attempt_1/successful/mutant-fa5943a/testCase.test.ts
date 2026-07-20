import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('throws an error with the message "Path contains invalid characters" when given a path with invalid characters', () => {
    expect(() => {
      Matcher.for('/invalid path!')
    }).toThrow('Path contains invalid characters')
  })
})