import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher with optional trailing double wildcard', () => {
  it('should match "/foo" against spec "/foo/**" since ** allows zero additional segments', () => {
    const matcher = Matcher.for('/foo/**')
    // With opt=true (original), regex allows matching without the wildcard segments
    // The mutation forces opt=false changing matching behavior
    expect('/foo'.match(matcher)).not.toBeNull()
  })
})