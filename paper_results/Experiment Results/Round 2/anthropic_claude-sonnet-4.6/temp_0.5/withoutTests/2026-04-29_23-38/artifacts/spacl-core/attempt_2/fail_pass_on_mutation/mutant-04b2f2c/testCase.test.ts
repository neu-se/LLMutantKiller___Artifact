import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should return null when matching a non-root path string that ends with a trailing slash', () => {
    const matcher = new Matcher('/foo')
    // '/foo/' ends with '/' and length > 1, so the original returns null
    // The mutated code removes the return null, so the regex match proceeds
    // The regex for '/foo' would match '/foo' but '/foo/' should be rejected by the guard
    const result = 'match' in matcher ? matcher[Symbol.match]('/foo/') : null
    expect(result).toBeNull()
  })
})