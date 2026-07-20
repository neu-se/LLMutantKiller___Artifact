import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('root path matcher should match only root string', () => {
    const m = new Matcher('/')
    expect(m.source).toBe('^\\/$')
    expect('/'.match(m)).not.toBeNull()
    expect('/foo'.match(m)).toBeNull()
  })
})