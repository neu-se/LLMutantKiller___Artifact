import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher.for default version parameter', () => {
  it('should use version 1.1 as default when no version is specified, accepting 1.1 valid wildcards', () => {
    // In version 1.1, '**' is a valid wildcard (matches zero or more segments)
    // In version 1.0, '**' would be considered malformed
    // The mutation changes the default version from '1.1' to '' (empty string)
    // With an empty string version, the version check `version === '1' || version === '1.0'`
    // would be false, so it would use the 1.1 regex pattern for wildcard validation
    // However, we need to find behavior that differs between '1.1' and ''
    
    // The key difference: with version '' (empty string), the condition
    // `version === '1' || version === '1.0'` is false, so it uses the 1.1 pattern
    // This means the behavior for wildcard validation would be the same as 1.1
    // 
    // But we can test that calling Matcher.for without a version works correctly
    // by checking that it creates a valid matcher with 1.1 behavior
    
    // In version 1.1, '+' wildcard requires specific formatting
    // Let's test that '/**' (double star) works with default version (1.1)
    // and that the matcher correctly matches paths
    
    // With version 1.1 default, this should work fine
    const matcher = Matcher.for('/foo/**')
    expect(matcher).toBeInstanceOf(Matcher)
    expect(matcher.spec).toBe('/foo/**')
    
    // The matcher should match paths like /foo/bar/baz
    expect('/foo/bar/baz'.match(matcher)).not.toBeNull()
    expect('/foo'.match(matcher)).not.toBeNull()
    
    // Now test that the version parameter actually matters
    // With version '1.0', '**' is malformed
    expect(() => Matcher.for('/foo/**', '1.0')).toThrow('Path contains malformed wildcards')
    
    // The default should behave like '1.1', not like '1.0' or throw
    // If the default were '' (empty string), the condition version === '1' || version === '1.0'
    // would be false, falling through to the 1.1 regex check
    // The 1.1 regex: /\*[^*/]|\+[^+/]|[^/*]\*|[^/+]\+|\*\*\*|\+\+\+/
    // '/**' - the '**' part: '*' followed by '*' which is in [^*/]? No, '*' is not in [^*/]
    // Wait, [^*/] means not * and not /, so '**' would NOT match \*[^*/]
    // So '/**' would be valid under 1.1 regex too
    
    // Let's test a case that would fail with empty string version
    // The empty string version would cause issues if the regex matching fails
    // Actually with '' as version, the 1.1 branch is taken (since '' !== '1' && '' !== '1.0')
    // So behavior should be same as 1.1...
    
    // The real test: ensure default version creates a Matcher that behaves as version 1.1
    // Test with a wildcard that's valid in 1.1 but invalid in 1.0
    const matcher11 = Matcher.for('/test/**')
    const matcherExplicit = new Matcher('/test/**', '1.1')
    
    // Both should match the same paths
    const testPath = '/test/a/b/c'
    expect(testPath.match(matcher11)).not.toBeNull()
    expect(testPath.match(matcherExplicit)).not.toBeNull()
    
    // The regex patterns should be identical
    expect(matcher11.source).toBe(matcherExplicit.source)
  })
})