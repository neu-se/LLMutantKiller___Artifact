import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('throws an error with the message "Path contains invalid characters" when the path has invalid characters', () => {
    expect(() => new Matcher('/invalid path!')).toThrow('Path contains invalid characters')
  })
})