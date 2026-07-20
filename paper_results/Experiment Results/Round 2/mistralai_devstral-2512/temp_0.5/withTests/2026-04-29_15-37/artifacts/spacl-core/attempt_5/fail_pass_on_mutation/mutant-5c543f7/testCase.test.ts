import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'
import { describe, it } from '@jest/globals'

describe('matcher capture validation', () => {
  it('should reject invalid capture segments with missing name', () => {
    expect(() => Matcher.for('/:')).toThrow('Path contains malformed captures')
  })
})