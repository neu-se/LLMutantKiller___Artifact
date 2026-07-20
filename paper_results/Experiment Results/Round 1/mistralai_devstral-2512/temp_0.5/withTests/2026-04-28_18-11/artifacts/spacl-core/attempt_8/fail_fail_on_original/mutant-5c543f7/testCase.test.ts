import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'
import { describe, it } from '@jest/globals'

describe('matcher', () => {
  it('should reject capture segments with single character names', () => {
    expect(() => {
      Matcher.for('/:a')
    }).toThrow('Path contains malformed captures')
  })
})