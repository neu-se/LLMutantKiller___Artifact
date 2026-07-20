import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher [Symbol.match]', () => {
  it('should return null for paths ending with a slash', () => {
    const matcher = new Matcher('/foo')
    const result = '/foo/'.match(matcher)
    expect(result).toBeNull()
  })
})