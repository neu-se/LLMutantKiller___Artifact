import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should handle capture names with multiple characters correctly', () => {
    // Test that a multi-char capture name works and produces correct props
    const matcher = new Matcher('/:userId')
    expect(matcher.props).toEqual(['userId'])
    const result = '/42'.match(matcher)
    expect(result).not.toBeNull()
    expect(result![1]).toBe('42')
  })
})