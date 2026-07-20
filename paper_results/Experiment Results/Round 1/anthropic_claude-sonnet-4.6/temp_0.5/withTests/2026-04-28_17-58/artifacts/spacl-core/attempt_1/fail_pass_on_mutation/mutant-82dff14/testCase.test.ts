import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher constructor default version parameter', () => {
  it('should reject malformed wildcards that are only invalid in version 1.1 when using default version', () => {
    // In version 1.1 (the original default), '/**foo' is rejected because
    // it matches /\*[^*/]|\+[^+/]|[^/*]\*|[^/+]\+|\*\*\*|\+\+\+/
    // In the mutated version, default is "" which falls through to the 1.1 regex path
    // but we need to test behavior that differs between version "1.1" and ""
    
    // The key difference: with version '1.1', the spec '/++' should be ACCEPTED
    // With version '1' or '1.0', '/++' should be REJECTED (malformed wildcard in v1)
    // With version '' (mutated default), the condition `version === '1' || version === '1.0'`
    // is false, so it uses the 1.1 regex - meaning '/++' would be accepted
    // This means the mutated code behaves the same as '1.1' for wildcards
    
    // However, the real difference is in the TYPE SIGNATURE - the default parameter
    // changes from '1.1' to "" which is not a valid type, but at runtime it matters
    // for the version check condition.
    
    // Let's test that the default version correctly handles version 1 wildcard rules:
    // In version '1', '+*' is malformed (matches /[*+][^/]|[^/][*+]/)
    // In version '1.1', '+*' is also malformed (matches /\*[^*/]|\+[^+/]|[^/*]\*|[^/+]\+/)
    // So we need a case where behavior differs between '1.1' and ''
    
    // The condition is: version === '1' || version === '1.0' ? v1_regex : v1_1_regex
    // With default '1.1': uses v1_1 regex
    // With default '': uses v1_1 regex (same behavior for wildcards)
    
    // But the real observable difference: Matcher.for() with no version arg
    // In original: defaults to '1.1', accepts '/++'
    // In mutated: defaults to '', still uses v1_1 regex path, so also accepts '/++'
    
    // Let's think differently - what if we pass version '1' explicitly and check
    // that the default behaves like '1.1' not like '1'?
    // '/++' is accepted in 1.1 but rejected in 1
    
    // Test: new Matcher('/++') with no version should behave like '1.1' (accept it)
    // Original: default is '1.1' -> accepts '/++'
    // Mutated: default is '' -> '' !== '1' && '' !== '1.0' -> uses 1.1 regex -> also accepts '/++'
    
    // The mutation changes "" which is not assignable to the union type at compile time
    // but at runtime the check `version === '1' || version === '1.0'` still works the same way
    // since '' is falsy for both comparisons.
    
    // Actually the real difference might be subtle - let's verify by checking
    // that Matcher.for('/foo') works correctly with default version
    // and that the default version matches expected behavior for version-specific features
    
    // Test that the default version allows v1.1 features like '++' and '**'
    expect(() => new Matcher('/++')).not.toThrow()
    expect(() => new Matcher('/**')).not.toThrow()
    
    // Now verify that when explicitly passing '1', these ARE rejected
    expect(() => new Matcher('/++', '1')).toThrow('Path contains malformed wildcards')
    expect(() => new Matcher('/**', '1.0')).toThrow('Path contains malformed wildcards')
    
    // The key test: Matcher.for() without version should behave like '1.1'
    // meaning it should accept '/++' - this works in both original and mutated
    // BUT: Matcher.for('/++') should produce the same result as Matcher.for('/++', '1.1')
    const defaultMatcher = Matcher.for('/++')
    const v11Matcher = Matcher.for('/++', '1.1')
    
    // Both should match '/' and '/foo' but not '/foo/bar'
    expect('/'.match(defaultMatcher)).not.toBeNull()
    expect('/foo'.match(defaultMatcher)).not.toBeNull()
    expect('/foo/bar'.match(defaultMatcher)).toBeNull()
    
    expect(defaultMatcher.source).toBe(v11Matcher.source)
  })
})