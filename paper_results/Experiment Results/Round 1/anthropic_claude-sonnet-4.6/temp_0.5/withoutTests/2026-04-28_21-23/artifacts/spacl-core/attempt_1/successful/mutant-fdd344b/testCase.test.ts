import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher malformed wildcard detection', () => {
  it('should throw an error for a wildcard followed by a non-slash character in version 1.0', () => {
    // In version '1.0', the regex /[*+][^/]|[^/][*+]/ is used
    // The path /*abc has '*a' which matches [*+][^/] (wildcard followed by non-slash)
    // Original code: throws 'Path contains malformed wildcards'
    // Mutated code: does NOT throw because '*a' doesn't match [*+][/]
    expect(() => new Matcher('/*abc', '1.0')).toThrow('Path contains malformed wildcards')
  })
})