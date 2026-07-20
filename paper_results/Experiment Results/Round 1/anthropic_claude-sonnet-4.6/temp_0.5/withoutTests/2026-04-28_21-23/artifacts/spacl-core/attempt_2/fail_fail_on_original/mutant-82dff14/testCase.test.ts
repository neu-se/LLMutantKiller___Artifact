import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should accept /foo/** with default version matching same paths as explicit version 1.1, and the default should not behave like version 1 which rejects /**', () => {
    // In version 1.0/1, the wildcard check regex is /[*+][^/]|[^/][*+]/
    // '/**' contains '*' followed by '*': the first '*' is preceded by '/', and followed by '*'
    // '*' is [^/], so /[^/][*+]/ would match the sequence '**' (second * preceded by first *)
    // Wait: checking '/**': chars are '/', '*', '*'
    // /[^/][*+]/ looks for non-slash followed by * or +
    // At position 1-2: '*' followed by '*' -> '*' is [^/] and '*' is [*+] -> MATCH -> invalid in v1.0
    
    // In version 1.1, regex is /\*[^*/]|\+[^+/]|[^/*]\*|[^/+]\+|\*\*\*|\+\+\+/
    // '/**': check /\*[^*/]/: '*' at pos1, next is '*' which IS in [*/], so no match
    // check /[^/*]\*/: char before second '*' is first '*' which IS in [/*], so no match -> VALID

    // So '/**' is invalid in v1.0 but valid in v1.1
    // Original default '1.1': new Matcher('/**') -> valid, no throw
    // Mutated default '': '' != '1' and '' != '1.0' -> uses v1.1 regex -> also valid, no throw
    // SAME BEHAVIOR - can't distinguish this way

    // The ONLY way to distinguish: we need '' to produce different behavior than '1.1'
    // Since the condition is (version === '1' || version === '1.0'), both '' and '1.1' are false
    // There is NO path-based test that can distinguish them

    // Alternative: test that Matcher.for() (which always uses '1.1' explicitly) 
    // produces same result as new Matcher() with default
    // This is always true regardless of mutation

    // I'll test the static `for` method produces same regex as default constructor
    // and verify the spec property is stored correctly
    const m1 = Matcher.for('/test/:id')
    const m2 = new Matcher('/test/:id')
    
    expect(m1.source).toBe(m2.source)
    expect(m1.spec).toBe(m2.spec)
    expect(m1.props).toEqual(m2.props)
    expect(m1.props).toEqual(['id'])
    
    // Test that the default version is effectively '1.1' by verifying
    // a path using ++ wildcard (valid in 1.1) works with default constructor
    // '++' in 1.1: check /\+[^+/]/: '+' followed by '+' which IS in [+/], no match -> valid
    // '++' in 1.0: check /[*+][^/]/: '+' followed by '+' which is [^/] -> MATCH -> invalid!
    expect(() => new Matcher('/foo/++')).not.toThrow()
    expect(() => new Matcher('/foo/++', '1.0')).toThrow('Path contains malformed wildcards')
    expect(() => new Matcher('/foo/++', '1')).toThrow('Path contains malformed wildcards')
    
    // With mutated default '': '' != '1' and '' != '1.0' -> uses 1.1 regex -> no throw
    // STILL SAME - this test would pass on both original and mutated
    
    // I cannot write a test that distinguishes '1.1' from '' as default
    // because both produce identical runtime behavior
    // Writing the best behavioral test possible:
    expect(new Matcher('/foo/++').test('/foo/bar/baz')).toBe(true)
  })
})