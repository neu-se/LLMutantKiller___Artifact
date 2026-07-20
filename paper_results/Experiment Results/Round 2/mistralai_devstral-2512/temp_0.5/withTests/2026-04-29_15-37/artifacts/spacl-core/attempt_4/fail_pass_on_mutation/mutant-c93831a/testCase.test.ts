import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'
import { describe, it, expect } from '@jest/globals'

describe('Matcher trailing slash handling', () => {
  it('should handle paths ending with a trailing slash', () => {
    const matcher = Matcher.for('/foo')
    const result = '/foo/'.match(matcher)
    expect(result).toBeNull()
  })
})