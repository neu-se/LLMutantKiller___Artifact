import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('source should contain root alternative for all-optional wildcard spec', () => {
    const matcher = new Matcher('/**', '1.1')
    expect(matcher.source).toContain('^/$')
  })
})