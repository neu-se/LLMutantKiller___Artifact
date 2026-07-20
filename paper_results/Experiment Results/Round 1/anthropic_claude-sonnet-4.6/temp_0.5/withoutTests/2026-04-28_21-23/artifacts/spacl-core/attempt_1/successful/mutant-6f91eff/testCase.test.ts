import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher wildcard validation for version 1.0', () => {
  it('should accept a valid path with multiple characters in version 1.0 without throwing', () => {
    // In the original code, the regex for version 1/1.0 is /[*+][^/]|[^/][*+]/
    // which only matches malformed wildcards like 'a*' or '*a'
    // In the mutated code, the regex is /[*+][^/]|[^/][^*+]/
    // which would match 'ab' (a followed by b, where b is not * or +)
    // causing valid paths to incorrectly throw errors
    expect(() => {
      new Matcher('/ab', '1.0')
    }).not.toThrow()
  })
})