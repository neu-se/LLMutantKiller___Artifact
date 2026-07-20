import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher [Symbol.match]', () => {
  it('should return null for paths that end with a trailing slash', () => {
    const matcher = new Matcher('/foo/bar')
    const result = '/foo/bar/'[Symbol.match](matcher)
    expect(result).toBeNull()
  })
})