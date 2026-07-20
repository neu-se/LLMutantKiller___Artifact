import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should match root path "/" against "/++" spec', () => {
    const matcher = new Matcher('/++')
    expect('/'.match(matcher)).not.toBeNull()
  })
})