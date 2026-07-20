import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher.for default version parameter type', () => {
  it('should have a default version parameter typed as 1.1 not empty string', () => {
    // The original code defaults version to '1.1' (a valid version string)
    // The mutated code defaults version to '' (not a valid version type)
    // TypeScript should reject '' as a default for type '1' | '1.0' | '1.1'
    // This test verifies the type signature is correct by ensuring the function
    // signature accepts only valid version strings
    
    // @ts-expect-error - empty string should NOT be a valid version
    const shouldFail = () => new Matcher('/test', '')
    expect(shouldFail).toThrow()
    
    // Valid versions should work fine
    expect(() => Matcher.for('/test', '1')).not.toThrow()
    expect(() => Matcher.for('/test', '1.0')).not.toThrow()
    expect(() => Matcher.for('/test', '1.1')).not.toThrow()
    
    // The default (no version arg) should behave exactly like '1.1'
    // In v1.1, a path with '**' wildcard is valid
    // In v1, '**' would be checked against /[*+][^/]|[^/][*+]/ - '*' followed by '*'
    // matches [^/][*+] so '**' is INVALID in v1 but VALID in v1.1
    // So Matcher.for('/**') should succeed (default is 1.1)
    // and new Matcher('/**', '1') should fail
    expect(() => Matcher.for('/**')).not.toThrow()
    expect(() => new Matcher('/**', '1')).toThrow('Path contains malformed wildcards')
    
    // Now verify the default truly acts as '1.1' not as some other version
    // by checking the created matcher behaves correctly
    const m1 = Matcher.for('/**')
    const m2 = new Matcher('/**', '1.1')
    expect(m1.test('/')).toBe(m2.test('/'))
    expect(m1.test('/a')).toBe(m2.test('/a'))
    expect(m1.test('/a/b/c')).toBe(m2.test('/a/b/c'))
  })
})