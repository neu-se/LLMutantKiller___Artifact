import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'
import { describe, it } from '@jest/globals'

describe('matcher capture validation', () => {
  it('should reject paths with invalid capture segments', () => {
    expect(() => Matcher.for('/:a:')).toThrow('Path contains malformed captures')
  })
})