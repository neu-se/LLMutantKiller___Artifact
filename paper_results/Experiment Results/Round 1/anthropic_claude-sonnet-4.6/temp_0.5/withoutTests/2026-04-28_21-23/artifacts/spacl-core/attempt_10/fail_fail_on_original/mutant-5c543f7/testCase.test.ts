import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should correctly identify props for capture with single char name', () => {
    const matcher = new Matcher('/:x/foo')
    expect(matcher.props).toEqual(['x'])
    expect(matcher.source).toBe('^/([^/]+)/foo$')
    const result = '/bar/foo'.match(matcher)
    expect(result).not.toBeNull()
    expect(result![1]).toBe('bar')
    expect('/baz/qux'.match(matcher)).toBeNull()
  })
})