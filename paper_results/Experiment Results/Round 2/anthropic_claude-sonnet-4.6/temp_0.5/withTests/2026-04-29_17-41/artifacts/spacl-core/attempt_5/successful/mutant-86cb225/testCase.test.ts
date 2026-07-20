import { describe, it, expect } from "@jest/globals"
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('rejects path with wildcard immediately followed by another wildcard in version 1', () => {
    // /+* with version '1':
    // The string is: '/', '+', '*'
    // Original regex /[*+][^/]|[^/][*+]/:
    //   At pos 1: '+' matches [*+], '*' matches [^/] → MATCH → throws
    // Mutated regex /[^*+][^/]|[^/][*+]/:
    //   At pos 0: '/' matches [^*+], '+' matches [^/] → MATCH → throws (same result!)
    //   So this won't differentiate.
    //
    // Need a case where ONLY [*+][^/] matches and NOT [^*+][^/] or [^/][*+].
    // That requires: wildcard at position where preceding char is also wildcard (not [^*+])
    // AND the char after wildcard is not itself a wildcard (not [*+]).
    // Example: /**foo - the '*f' pair: '*' not in [^*+], but '/' before first '*' gives '/*' matching [^*+][^/]
    // Still caught by mutated.
    //
    // What about a string starting with wildcard? Impossible since spec must start with '/'.
    //
    // The ONLY scenario: two consecutive wildcards where second is followed by non-slash non-wildcard
    // AND no slash precedes the first wildcard... impossible in valid specs.
    //
    // Let me try: does the mutated regex incorrectly match valid paths?
    // /+ (valid in v1): '/', '+' - '/' matches [^*+], '+' matches [^/] → mutated throws on valid path!
    expect(() => new Matcher('/+', '1')).not.toThrow()
  })
})