import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('Matcher for /**/++ matches root path / in original but not mutated', () => {
    const m = new Matcher('/**/++')
    expect('/'.match(m)).not.toBeNull()
  })
})