import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher [Symbol.match]', () => {
  it('should return null when matching a path with a trailing slash even if the regex would otherwise match', () => {
    const matcher = new Matcher('/foo')
    // '/foo/' ends with '/' and length > 1, so original returns null
    // but the regex for '/foo' is something like '^/foo$' which won't match '/foo/'
    // We need a case where the regex WOULD match but the guard prevents it
    // A wildcard spec like '/*' compiles to a regex that might match '/foo/'
    const wildcardMatcher = new Matcher('/*')
    const result = wildcardMatcher[Symbol.match]('/foo/')
    expect(result).toBeNull()
  })
})