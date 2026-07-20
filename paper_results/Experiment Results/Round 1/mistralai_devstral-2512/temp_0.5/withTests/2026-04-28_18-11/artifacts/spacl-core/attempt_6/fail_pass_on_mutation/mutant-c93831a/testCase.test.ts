import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher Symbol.match behavior', () => {
  it('should return null for strings ending with trailing slash when length > 1', () => {
    const matcher = Matcher.for('/foo')
    const result = matcher[Symbol.match]('/foo/')
    expect(result).toBeNull()
    const result2 = matcher[Symbol.match]('/f/')
    expect(result2).toBeNull()
  })
})