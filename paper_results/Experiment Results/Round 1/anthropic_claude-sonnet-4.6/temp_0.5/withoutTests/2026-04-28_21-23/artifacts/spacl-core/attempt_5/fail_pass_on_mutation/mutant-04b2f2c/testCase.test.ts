import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should return null for a string ending with slash of length greater than 1', () => {
    const matcher = new Matcher('/foo/++')
    const result = matcher[Symbol.match]('/foo/')
    expect(result).toBeNull()
  })
})