import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

// This type-level test verifies the constructor signature
// In the original: default is '1.1' which satisfies '1' | '1.0' | '1.1'  
// In the mutated: default is '' which does NOT satisfy '1' | '1.0' | '1.1'
// ts-jest should report a type error when compiling the mutated source

describe('Matcher', () => {
  it('should work correctly with all valid version strings', () => {
    // Test all valid versions explicitly
    expect(() => new Matcher('/foo', '1')).not.toThrow()
    expect(() => new Matcher('/foo', '1.0')).not.toThrow()
    expect(() => new Matcher('/foo', '1.1')).not.toThrow()
    
    // Test default (no version)
    expect(() => new Matcher('/foo')).not.toThrow()
    
    // Verify the default behaves like '1.1' by testing a path 
    // that's valid in 1.1 but invalid in 1.0
    expect(() => new Matcher('/foo/++')).not.toThrow()
    expect(() => new Matcher('/foo/++', '1.1')).not.toThrow()
    expect(() => new Matcher('/foo/++', '1')).toThrow()
    expect(() => new Matcher('/foo/++', '1.0')).toThrow()
  })
})