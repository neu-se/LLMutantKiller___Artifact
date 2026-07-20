import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher Symbol.match behavior', () => {
  it('should return null for paths ending with slash when length > 1', () => {
    const matcher = Matcher.for('/foo')
    const result = matcher[Symbol.match]('/foo/')
    expect(result).toBeNull()
  })
})