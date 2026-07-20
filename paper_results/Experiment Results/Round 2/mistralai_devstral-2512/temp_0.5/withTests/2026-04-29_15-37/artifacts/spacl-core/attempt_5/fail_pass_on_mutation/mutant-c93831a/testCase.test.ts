import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'
import { describe, it, expect } from '@jest/globals'

describe('Matcher trailing slash behavior', () => {
  it('should return null for paths ending with trailing slash when length > 1', () => {
    const matcher = Matcher.for('/foo')
    const longPath = '/foo/'.repeat(2).slice(0, -1) + '/'
    const result = longPath.match(matcher)
    expect(result).toBeNull()
  })
})