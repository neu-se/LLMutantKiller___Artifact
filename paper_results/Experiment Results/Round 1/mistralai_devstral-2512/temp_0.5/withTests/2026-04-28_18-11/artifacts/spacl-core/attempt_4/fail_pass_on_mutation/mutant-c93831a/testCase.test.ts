import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher Symbol.match behavior', () => {
  it('should return null for strings with trailing slash longer than 1 character', () => {
    const matcher = Matcher.for('/foo')
    const result = matcher[Symbol.match]('/foo/')
    expect(result).toBeNull()
  })
})