import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should not treat a two-character segment starting with colon differently', () => {
    const matcher = new Matcher('/:ab')
    expect(matcher.props).toEqual(['ab'])
    const result = '/hello'.match(matcher)
    expect(result).not.toBeNull()
    expect(result![1]).toBe('hello')
    // A literal path should not match
    const noMatch = '/'.match(matcher)
    expect(noMatch).toBeNull()
  })
})