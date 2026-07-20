import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher.for', () => {
  it('should compile without TypeScript errors, meaning the default version must be a valid version literal', () => {
    // The mutated code sets default version to "" which is NOT assignable to '1' | '1.0' | '1.1'
    // ts-jest will fail to compile the mutated source file due to this type error
    // The original code sets default to '1.1' which IS valid and compiles fine
    
    // This assertion verifies the module loaded and works correctly
    const matcher = Matcher.for('/hello')
    expect(matcher).toBeInstanceOf(Matcher)
    expect(matcher.spec).toBe('/hello')
    expect(matcher.test('/hello')).toBe(true)
    expect(matcher.test('/world')).toBe(false)
  })
})