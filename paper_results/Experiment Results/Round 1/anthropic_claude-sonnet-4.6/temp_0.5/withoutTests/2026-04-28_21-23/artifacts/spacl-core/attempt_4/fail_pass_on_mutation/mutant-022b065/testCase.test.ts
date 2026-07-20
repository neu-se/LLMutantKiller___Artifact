import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should not throw for a path that contains slash but does not end with slash', () => {
    // /foo/bar has a slash in the middle but not at the end
    // The regex ^.+\/$ should NOT match this (no trailing slash)
    // The regex .+\/$ should also NOT match this (no trailing slash)
    // But let's verify...
    expect(() => new Matcher('/foo/bar')).not.toThrow()
  })
})