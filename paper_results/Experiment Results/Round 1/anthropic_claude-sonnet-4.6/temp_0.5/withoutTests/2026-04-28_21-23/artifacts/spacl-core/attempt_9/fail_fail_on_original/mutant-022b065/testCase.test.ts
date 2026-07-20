import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should compile root path correctly', () => {
    const m = new Matcher('/')
    expect(m.source).toBe('^\/$')
    expect('/'.match(m)).not.toBeNull()
  })
})