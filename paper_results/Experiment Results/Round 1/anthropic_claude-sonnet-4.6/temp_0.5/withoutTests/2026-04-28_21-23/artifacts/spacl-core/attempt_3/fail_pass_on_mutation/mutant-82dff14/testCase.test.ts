import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should construct with default version and correctly match paths', () => {
    const matcher = new Matcher('/foo/:id')
    expect(matcher.spec).toBe('/foo/:id')
    expect(matcher.props).toEqual(['id'])
    expect(matcher.test('/foo/bar')).toBe(true)
    expect(matcher.test('/foo')).toBe(false)
  })
})