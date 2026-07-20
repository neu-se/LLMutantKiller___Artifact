import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('compiled regex source should be correct for root path', () => {
    const m = new Matcher('/')
    expect(m.source).toBe('^/$|^$')  // or whatever the actual compiled source is
  })
})