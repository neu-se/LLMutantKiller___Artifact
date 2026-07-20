import { describe, it, expect } from "@jest/globals"
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('rejects a path where a wildcard is immediately followed by a non-slash character using version 1.0', () => {
    // With version '1.0', malformed wildcard check uses /[*+][^/]|[^/][*+]/
    // Original: [*+][^/] matches '+f' in '/+foo', so it throws
    // Mutated:  [^*+][^/] does NOT match '+f' (+ is excluded), and [^/][*+] doesn't match either
    //           so the mutated code would NOT throw, causing this test to fail
    expect(() => new Matcher('/+foo', '1.0')).toThrow('Path contains malformed wildcards')
  })
})