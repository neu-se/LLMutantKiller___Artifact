import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('compiles /++/bar to a regex matching /bar (zero wildcard segments)', () => {
    const matcher = new Matcher('/++/bar')
    // /++/bar with ++ matching zero segments should match /bar
    expect('/bar'.match(matcher)).not.toBeNull()
    expect('/foo/bar'.match(matcher)).not.toBeNull()
    expect('/foo/baz/bar'.match(matcher)).toBeNull()
    expect('/'.match(matcher)).toBeNull()
    // Verify the source matches expected pattern
    expect(matcher.source).toBe('(?:\\/[^/]+)?\\/bar$'.replace(/^/, '^'))
  })
})