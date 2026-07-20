import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher capture behavior', () => {
  it('should treat a single-character named capture as a capture group and not as a literal path segment', () => {
    // A path spec with a single-character capture name /:x
    const matcher = new Matcher('/:x')
    
    // The match should capture the value
    const result = '/hello'.match(matcher)
    expect(result).not.toBeNull()
    
    // The props should contain the capture name 'x'
    expect(matcher.props).toContain('x')
    
    // The captured group should be 'hello'
    expect(result![1]).toBe('hello')
  })
})