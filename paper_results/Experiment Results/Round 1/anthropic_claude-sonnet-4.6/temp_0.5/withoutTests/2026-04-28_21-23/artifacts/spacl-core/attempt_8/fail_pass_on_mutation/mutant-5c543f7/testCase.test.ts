import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should have empty props for a path with no captures', () => {
    const matcher = new Matcher('/foo/bar')
    expect(matcher.props).toEqual([])
    expect('/foo/bar'.match(matcher)).not.toBeNull()
    expect('/foo/baz'.match(matcher)).toBeNull()
  })
})