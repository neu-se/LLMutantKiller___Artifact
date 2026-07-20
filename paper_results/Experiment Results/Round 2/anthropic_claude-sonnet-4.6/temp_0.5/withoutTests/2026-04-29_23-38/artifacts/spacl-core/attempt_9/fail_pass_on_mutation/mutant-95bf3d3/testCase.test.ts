import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should match paths with optional middle segment', () => {
    const matcher = new Matcher('/foo/++/bar', '1.1')
    expect('/foo/baz/bar'.match(matcher)).not.toBeNull()
    expect('/foo/bar'.match(matcher)).not.toBeNull()
    expect('/foo'.match(matcher)).toBeNull()
  })
})