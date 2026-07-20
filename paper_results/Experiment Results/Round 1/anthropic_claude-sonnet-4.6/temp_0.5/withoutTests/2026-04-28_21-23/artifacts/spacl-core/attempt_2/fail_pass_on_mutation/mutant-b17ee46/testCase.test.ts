import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher.for default version', () => {
  it('should create a valid Matcher using default version 1.1 when no version is specified', () => {
    // The original code has default version '1.1'
    // The mutated code has default version '' which is not a valid version type
    // This test verifies that Matcher.for works correctly with its default version
    // by testing behavior consistent with version '1.1'
    
    // In version 1.1, '+' and '++' are valid wildcards in their own segments
    // This path should be valid in both v1 and v1.1
    const matcher = Matcher.for('/test')
    expect(matcher).toBeInstanceOf(Matcher)
    expect(matcher.spec).toBe('/test')
    
    // Verify the matcher works correctly - matches exact path
    expect(matcher.test('/test')).toBe(true)
    expect(matcher.test('/other')).toBe(false)
    
    // The default version should be '1.1' - verify by checking that a path
    // valid only under v1.1 wildcard rules works when using default
    // In v1.1, '**' (double star) is a valid wildcard meaning zero or more segments
    const wildcardMatcher = Matcher.for('/**')
    expect(wildcardMatcher.test('/a')).toBe(true)
    expect(wildcardMatcher.test('/a/b')).toBe(true)
    expect(wildcardMatcher.test('/')).toBe(true)
  })
})