import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should return null for trailing slash paths even when regex would otherwise match', () => {
    const matcher = new Matcher('/**')
    const result = matcher[Symbol.match]('/foo/')
    expect(result).toBeNull()
  })
})