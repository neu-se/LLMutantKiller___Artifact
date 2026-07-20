import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'
import { describe, it } from '@jest/globals'

describe('matcher capture validation', () => {
  it('should correctly handle capture segments with empty names', () => {
    expect(() => Matcher.for('/:')).toThrow('Path contains malformed captures')
  })
})