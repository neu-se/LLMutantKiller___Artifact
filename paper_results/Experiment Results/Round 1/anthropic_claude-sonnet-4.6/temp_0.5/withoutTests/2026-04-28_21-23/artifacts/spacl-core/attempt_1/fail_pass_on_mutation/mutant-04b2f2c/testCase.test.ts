import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should return null when matching a string that ends with a slash', () => {
    const matcher = new Matcher('/foo/bar')
    const result = matcher[Symbol.match]('/foo/bar/')
    expect(result).toBeNull()
  })
})