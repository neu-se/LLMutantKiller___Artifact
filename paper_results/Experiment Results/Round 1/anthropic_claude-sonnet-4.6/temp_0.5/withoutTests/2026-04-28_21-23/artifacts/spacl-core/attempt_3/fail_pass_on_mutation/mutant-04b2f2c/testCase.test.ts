import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should return null when matching a path that ends with a trailing slash', () => {
    const matcher = new Matcher('/foo')
    const result = matcher[Symbol.match]('/foo/')
    expect(result).toBeNull()
  })
})