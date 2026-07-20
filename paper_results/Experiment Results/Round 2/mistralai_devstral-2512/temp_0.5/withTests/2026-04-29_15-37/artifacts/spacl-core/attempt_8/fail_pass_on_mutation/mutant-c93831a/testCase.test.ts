import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'
import { describe, it, expect } from '@jest/globals'

describe('Matcher trailing slash handling', () => {
  it('should not match paths ending with trailing slash when length > 1', () => {
    const matcher = Matcher.for('/foo')
    const path = '/foo/'
    const result = path.match(matcher)
    expect(result).toBeNull()
  })
})