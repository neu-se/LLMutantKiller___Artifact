import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher [Symbol.match]', () => {
  it('should return null when matching a path that ends with a trailing slash', () => {
    const matcher = new Matcher('/foo/bar')
    const result = matcher[Symbol.match]('/foo/bar/')
    expect(result).toBeNull()
  })
})