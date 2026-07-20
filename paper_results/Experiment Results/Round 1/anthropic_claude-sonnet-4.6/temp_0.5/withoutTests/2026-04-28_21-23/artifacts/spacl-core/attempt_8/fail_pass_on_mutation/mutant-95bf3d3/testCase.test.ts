import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('Matcher.for with default version creates valid matcher', () => {
    const m = Matcher.for('/foo')
    expect('/foo'.match(m)).not.toBeNull()
    expect('/bar'.match(m)).toBeNull()
  })
})