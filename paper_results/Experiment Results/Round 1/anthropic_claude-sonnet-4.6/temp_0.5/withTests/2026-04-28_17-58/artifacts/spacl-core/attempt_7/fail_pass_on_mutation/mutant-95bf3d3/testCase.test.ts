import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('compiles /**/bar to correct regex that does not match root', () => {
    const matcher = new Matcher('/**/bar')
    // /**/bar should NOT match /bar with zero wildcard segments
    // because ** requires the pattern (?:/[^/]+)* which can match zero times
    // but the full path /bar should still match
    expect('/bar'.match(matcher)).not.toBeNull()
    expect('/foo/bar'.match(matcher)).not.toBeNull()
    expect('/'.match(matcher)).toBeNull()
    expect('/foo'.match(matcher)).toBeNull()
    // The regex source should not contain the optional root prefix
    expect(matcher.source).not.toContain('^\\/$|^')
  })
})