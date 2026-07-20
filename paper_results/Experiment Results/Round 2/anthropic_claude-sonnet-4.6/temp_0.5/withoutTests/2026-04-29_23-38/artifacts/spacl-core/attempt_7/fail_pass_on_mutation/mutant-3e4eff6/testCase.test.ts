import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher with optional single segment wildcard', () => {
  it('should match root "/" against spec "/++" since ++ makes the segment optional', () => {
    const matcher = Matcher.for('/++', '1.1')
    expect('/'.match(matcher)).not.toBeNull()
  })
})