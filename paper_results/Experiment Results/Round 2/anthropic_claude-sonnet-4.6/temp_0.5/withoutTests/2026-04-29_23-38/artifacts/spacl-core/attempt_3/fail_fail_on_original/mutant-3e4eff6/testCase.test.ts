import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher root path matching', () => {
  it('should match "/" against spec "/**" using version 1', () => {
    const matcher = new Matcher('/**', '1')
    const result = '/'.match(matcher)
    expect(result).not.toBeNull()
  })
})