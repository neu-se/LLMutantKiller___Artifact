import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should return null for trailing slash even when underlying regex could match', () => {
    const matcher = new Matcher('/foo/**')
    const result = matcher[Symbol.match]('/foo/')
    expect(result).toBeNull()
  })
})