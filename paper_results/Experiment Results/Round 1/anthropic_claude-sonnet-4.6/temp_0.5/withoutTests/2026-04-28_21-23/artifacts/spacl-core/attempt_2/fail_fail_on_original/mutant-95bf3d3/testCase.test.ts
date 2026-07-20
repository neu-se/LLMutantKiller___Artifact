import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should match root path / for spec /foo/**', () => {
    const m = new Matcher('/foo/**')
    expect('/'.match(m)).not.toBeNull()
  })
})