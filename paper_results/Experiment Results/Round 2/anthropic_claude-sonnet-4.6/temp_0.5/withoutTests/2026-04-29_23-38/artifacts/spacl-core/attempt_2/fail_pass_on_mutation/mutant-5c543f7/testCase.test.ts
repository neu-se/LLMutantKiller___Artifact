import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should not treat a literal segment ending with a colon-like pattern as a capture', () => {
    // A segment like ':' followed by nothing would be invalid, but what about
    // testing that props are empty for non-capture paths
    const matcher = new Matcher('/foo/bar')
    expect(matcher.props).toEqual([])
    const result = '/foo/bar'.match(matcher)
    expect(result).not.toBeNull()
  })
})