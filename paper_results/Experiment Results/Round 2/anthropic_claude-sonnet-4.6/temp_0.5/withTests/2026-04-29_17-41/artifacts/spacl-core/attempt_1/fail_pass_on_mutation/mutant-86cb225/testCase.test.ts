import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect } from "@jest/globals"

describe('Matcher malformed wildcard detection in version 1.0', () => {
  it('should reject paths where a wildcard is followed by a non-slash character in version 1.0', () => {
    // In version 1.0, the regex used is /[*+][^/]|[^/][*+]/
    // The first alternative [*+][^/] catches wildcards followed by non-slash chars
    // e.g. /*foo: the '*f' portion matches [*+][^/]
    // The mutation changes [*+] to [^*+], breaking detection of wildcard-followed-by-non-slash
    expect(() => Matcher.for('/*foo', '1.0')).toThrow('Path contains malformed wildcards')
  })
})