import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should treat segment with colon prefix as capture regardless of name length', () => {
    // Try a capture with a name that contains characters that might affect regex matching
    // The ~ character is allowed in paths
    const matcher = new Matcher('/:~id')
    expect(matcher.props).toEqual(['~id'])
    const result = '/test'.match(matcher)
    expect(result).not.toBeNull()
    expect(result![1]).toBe('test')
  })
})