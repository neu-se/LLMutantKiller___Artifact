import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher capture behavior', () => {
  it('should correctly identify single-character capture names as props', () => {
    const matcher = new Matcher('/:x')
    expect(matcher.props).toEqual(['x'])
    const result = '/hello'.match(matcher)
    expect(result).not.toBeNull()
    expect(result![1]).toBe('hello')
  })
})