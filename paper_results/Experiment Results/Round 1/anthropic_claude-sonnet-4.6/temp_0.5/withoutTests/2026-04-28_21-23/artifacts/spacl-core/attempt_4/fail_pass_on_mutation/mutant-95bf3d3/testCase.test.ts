import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should match root path / against /++/**', () => {
    const m = new Matcher('/++/**')
    expect('/'.match(m)).not.toBeNull()
  })
})