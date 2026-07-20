import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('Matcher.for default version should handle wildcard specs correctly', () => {
    // Test that Matcher.for works with default version
    const matcher = Matcher.for('/foo/*')
    expect('/foo/bar'.match(matcher)).not.toBeNull()
    expect('/foo'.match(matcher)).toBeNull()
  })
})