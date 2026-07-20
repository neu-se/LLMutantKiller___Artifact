import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('spec with only optional wildcards should match root path', () => {
    const m1 = new Matcher('/**', '1.1')
    const m2 = new Matcher('/++', '1.1')
    // Both should match '/' since all wildcards are optional (min=0)
    expect('/'.match(m1)).not.toBeNull()
    expect('/'.match(m2)).not.toBeNull()
    // And should match paths with segments
    expect('/foo'.match(m1)).not.toBeNull()
    expect('/foo'.match(m2)).not.toBeNull()
  })
})