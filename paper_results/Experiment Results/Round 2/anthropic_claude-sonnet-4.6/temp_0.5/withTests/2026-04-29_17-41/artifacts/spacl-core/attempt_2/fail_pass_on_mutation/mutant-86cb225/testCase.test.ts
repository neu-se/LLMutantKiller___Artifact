import { describe, it, expect } from "@jest/globals"
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('rejects paths with a wildcard followed by a non-slash character in version 1', () => {
    // In version 1, malformed wildcard detection uses /[*+][^/]|[^/][*+]/
    // The first alternative [*+][^/] should catch '*' followed by a non-slash like 'f'
    // The mutation changes [*+] to [^*+], so /*foo would no longer be detected as malformed
    // Original: throws because [*+][^/] matches '*f' in /*foo
    // Mutated: does NOT throw because [^*+][^/] does not match '*f' (since * is excluded by [^*+])
    expect(() => new Matcher('/+foo', '1')).toThrow('Path contains malformed wildcards')
  })
})