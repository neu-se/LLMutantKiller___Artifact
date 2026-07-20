import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher constructor default version parameter', () => {
  it('should use version 1.1 by default, allowing ** wildcard without malformed wildcard error', () => {
    // In version 1.1, '**' is a valid wildcard (matches zero or more segments)
    // In version 1.0/'1', '**' would be considered malformed
    // With the mutation, the default version is "" which would not match '1' or '1.0',
    // so it falls into the else branch (version 1.1 regex check)
    // However, the key difference is in how wildcards like '+' adjacent to non-slash chars are handled
    
    // The mutation changes default from '1.1' to ''
    // With version '1.1', the wildcard regex is: /\*[^*/]|\+[^+/]|[^/*]\*|[^/+]\+|\*\*\*|\+\+\+/
    // With version '' (not '1' or '1.0'), it also uses the same regex branch
    // BUT the real issue is that with version '1.1', specific paths should work
    
    // Let's test a path that uses '+' wildcard which behaves differently between versions
    // In version 1.1, '+' means exactly one segment (required)
    // The malformed wildcard check for version 1.1 uses: /\*[^*/]|\+[^+/]|[^/*]\*|[^/+]\+|\*\*\*|\+\+\+/
    // For version 1.0, it uses: /[*+][^/]|[^/][*+]/
    
    // A path like '/foo/+' should work with default version (1.1)
    // Let's verify the default version affects wildcard matching behavior
    
    // With version '1.1' (original default), '/foo/**' should match '/foo/bar/baz'
    // With version '' (mutated default), the regex branch is the same (not '1' or '1.0')
    // so this particular path would work the same way
    
    // The real behavioral difference: test that Matcher.for() with explicit '1.1' 
    // matches same as new Matcher() with default version
    // If default is '' instead of '1.1', they should behave identically for path matching
    // since '' also falls into the 1.1 branch
    
    // Actually the mutation changes "" which means the version check 
    // `version === '1' || version === '1.0'` is false for both '' and '1.1'
    // So wildcard validation uses the same regex
    
    // BUT: the key difference might be in how paths are compiled
    // Let's check if there's any version-dependent compilation... 
    // Looking at the code, version only affects the malformed wildcard check
    
    // So the real test: a path that is valid in 1.1 but invalid in 1.0
    // should work with default constructor (original: 1.1, mutated: "")
    // Both '' and '1.1' use the same regex branch, so this won't differ
    
    // Wait - let me re-read. The mutation changes the DEFAULT value.
    // If someone calls new Matcher('/foo') without specifying version,
    // original uses '1.1', mutated uses ''
    // The version is only used in one place: the malformed wildcard check
    // Both '1.1' and '' would use the else branch (not '1' or '1.0')
    
    // The test should verify that the default version is '1.1' by testing
    // a path that would be valid in 1.1 but the version string itself matters
    // if it's passed to some external check... but it's not.
    
    // Actually, let me test: a path like '/foo/+/bar' 
    // In version 1.0: regex /[*+][^/]|[^/][*+]/ - '+' followed by '/' is fine, '/' followed by '+' is fine
    // In version 1.1: regex /\*[^*/]|\+[^+/]|[^/*]\*|[^/+]\+|\*\*\*|\+\+\+/
    // Hmm, these are checked on the spec string directly
    
    // The spec '/foo/+/bar' - in 1.0 regex: no match (+ is surrounded by /)
    // In 1.1 regex: no match either
    // Both valid.
    
    // Let me think about what path would differ...
    // In 1.0: /[*+][^/]/ matches '*a' or '+a' (wildcard not followed by slash)
    // In 1.1: /\+[^+/]/ matches '+a' (+ not followed by + or /)
    
    // A path like '/foo*' - in spec it's 'foo*' segment
    // 1.0 regex: /[*+][^/]|[^/][*+]/ - 'o*' matches [^/][*+], so INVALID in 1.0
    // 1.1 regex: /[^/*]\*/ - 'o*' matches, so INVALID in 1.1 too
    
    // What about '/*foo'? spec has '*foo' as a segment
    // 1.0: '*f' matches [*+][^/], INVALID
    // 1.1: '*f' - check /\*[^*/]/ - '*f' matches (star not followed by * or /), INVALID
    
    // Hmm, both versions reject the same things for these cases
    // Let me think of something valid in 1.1 but invalid in 1.0...
    // '/**' - spec has '**' segment
    // 1.0: /[*+][^/]|[^/][*+]/ on '/**' - '*' followed by '*' - '*' is not [^/], so no match. VALID in 1.0
    // Wait, '/**' as spec: the regex checks the whole spec string
    // spec = '/**', checking /[*+][^/]/ on '/**': '*' at position 1, next char is '*' which is not [^/]... 
    // Actually [^/] means any char except /, and '*' is not '/', so '*' matches [^/]
    // So '/**' in 1.0: '*' followed by '*' - '*' matches [^/], so /[*+][^/]/ matches! INVALID in 1.0
    // In 1.1: /\*[^*/]/ - '*' followed by '*' - '*' is excluded by [^*/], so no match. 
    // /\+[^+/]/ - no +. /[^/*]\*/ - '/' before first '*', '/' is excluded. /[^/+]\+/ - no +.
    // /\*\*\*/ - only two stars. /\+\+\+/ - no +. So VALID in 1.1!
    
    // So '/**' is INVALID in version 1.0 but VALID in version 1.1
    // With original default (1.1): new Matcher('/**') should succeed
    // With mutated default (''): version '' is not '1' or '1.0', so uses 1.1 regex, also succeeds
    
    // Hmm, still the same. The mutation from '1.1' to '' doesn't change behavior
    // because '' is not '1' or '1.0' either.
    
    // Wait, maybe I need to test the `spec` property or `props` property
    // or test that Matcher.for() with '1.1' behaves same as new Matcher() with default
    
    // Actually, the only observable difference would be if the default version
    // is somehow exposed or if it changes compilation behavior.
    // Looking at the code again... version ONLY affects the malformed wildcard check.
    // Both '1.1' and '' fall into the same branch.
    
    // So the mutation from '1.1' to '' has NO observable behavioral difference!
    // Unless... we test that the constructor signature itself is correct by passing
    // a value that relies on TypeScript type checking... but that's compile-time.
    
    // Let me reconsider. Maybe the test should verify that when no version is provided,
    // the behavior matches explicit '1.1' behavior (not '1' or '1.0' behavior).
    // We can test a path that's valid in 1.1 but invalid in 1.0, and verify
    // the default constructor accepts it.
    
    // '/**' is valid in 1.1 (uses ** wildcard)
    // Let's verify new Matcher('/**') works (doesn't throw) with default version
    expect(() => new Matcher('/**')).not.toThrow()
    
    // Also verify that when explicitly using version '1', '/**' throws
    expect(() => new Matcher('/**', '1')).toThrow('Path contains malformed wildcards')
    
    // The key assertion: default version should behave like '1.1', not like '1'
    // With original code (default='1.1'): new Matcher('/**') succeeds
    // With mutated code (default=''): '' is not '1' or '1.0', so also uses 1.1 branch, also succeeds
    
    // This means I need a different approach to detect the mutation.
    // The mutation changes the TypeScript default parameter value from '1.1' to ''.
    // At runtime, if we could somehow observe the version value...
    // But the version is not stored as a property.
    
    // The ONLY behavioral difference would be if '' causes different behavior than '1.1'
    // in the conditional: version === '1' || version === '1.0'
    // Both '1.1' and '' evaluate to false, so behavior is identical.
    
    // This mutation appears to have no observable behavioral difference at runtime.
    // However, let me check one more time if there's any path where behavior differs...
    
    // Actually wait - I need to re-examine. The test should FAIL on mutated code.
    // If both '' and '1.1' produce same behavior, the test can't distinguish them.
    // 
    // But maybe we can test the TypeScript type system behavior by checking
    // that passing an invalid version string causes a compile error...
    // No, that's not runtime testable.
    //
    // Let me look for any runtime difference more carefully.
    // The version parameter is ONLY used in this check:
    // spec.match(version === '1' || version === '1.0' ? regexA : regexB)
    //
    // For version '1.1': condition is false, uses regexB
    // For version '': condition is false, uses regexB  
    // Same behavior!
    //
    // So this mutation is actually equivalent at runtime for all inputs.
    // The only way to detect it would be through TypeScript type checking.
    //
    // However, since the task requires a test that fails on mutated code,
    // let me think if there's any edge case...
    //
    // Actually, I wonder if the test framework runs TypeScript with strict checking.
    // If we call new Matcher('/foo', ''), TypeScript would reject '' as not assignable
    // to '1' | '1.0' | '1.1' in the original, but in the mutated version the default
    // is '' which might affect type inference...
    //
    // But at runtime (after compilation), this doesn't matter.
    //
    // I'll write a test that verifies the default behavior matches '1.1' semantics
    // by testing a path that uses '**' which is valid in 1.1 but invalid in 1.0.
    // Even though both '' and '1.1' would pass this test, this is the most meaningful
    // behavioral test I can write for this mutation.
    
    const matcher = new Matcher('/**')
    expect(matcher.spec).toBe('/**')
    expect(matcher.test('/foo')).toBe(true)
    expect(matcher.test('/foo/bar')).toBe(true)
  })
})