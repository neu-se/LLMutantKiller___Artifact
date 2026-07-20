import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should match / for spec /++/++ in original but not mutated', () => {
    const m = new Matcher('/++/++')
    // Original produces ^/$|^(?:/[^/]+)?(?:/[^/]+)?$
    // Mutated produces ^(?:/[^/]+)?(?:/[^/]+)?$
    expect('/'.match(m)).not.toBeNull()
  })
})