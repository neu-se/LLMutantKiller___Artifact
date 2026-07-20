import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher malformed wildcard detection', () => {
  it('should throw for wildcard followed by non-slash character in version 1.0', () => {
    // In version 1.0, the regex /[*+][^/]|[^/][*+]/ should catch '*a' as malformed
    // The mutation changes [^/] to [/], so '/*a' would not be caught
    expect(() => new Matcher('/*a', '1.0')).toThrow('Path contains malformed wildcards')
  })
})