import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'
import { describe, it, expect } from '@jest/globals'

describe('Matcher trailing slash behavior', () => {
  it('should handle paths with trailing slash correctly when length > 1', () => {
    const matcher = Matcher.for('/test')
    const path = '/test/'
    const result = path.match(matcher)
    expect(result).toBeNull()
  })
})