import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

// This line should NOT produce a TypeScript error in the original code (default is '1.1')
// In the mutated code, the source file itself has a type error (default is '' which is invalid)
// causing ts-jest to fail compilation of the subject module

describe('Matcher.for', () => {
  it('should have correct TypeScript types where the default version is a valid version string', () => {
    // We verify the type of the static method by checking it accepts valid versions
    // and that the function signature is well-typed
    
    // This would cause a TS error if the parameter type is wrong:
    // The following line uses @ts-expect-error to assert that '' is NOT a valid version
    // If the mutated code changes the type signature to accept '', this line would error
    // @ts-expect-error - '' is not a valid version
    expect(() => Matcher.for('/test', '' as any)).not.toThrow()
    
    // Verify default behavior matches '1.1'
    const defaultMatcher = Matcher.for('/test')
    const v11Matcher = new Matcher('/test', '1.1')
    
    expect(defaultMatcher.test('/test')).toBe(v11Matcher.test('/test'))
    expect(defaultMatcher.test('/other')).toBe(v11Matcher.test('/other'))
  })
})