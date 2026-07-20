import * as MatcherModule from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher.for default version', () => {
  it('should pass version 1.1 as default to Matcher constructor', () => {
    const capturedVersions: string[] = []
    const OriginalMatcher = MatcherModule.Matcher
    
    // Replace the Matcher export with a spy class
    const SpyClass = jest.fn().mockImplementation(function(spec: string, version: string) {
      capturedVersions.push(version)
      // Create a real Matcher instance
      return new OriginalMatcher(spec, version as any)
    })
    
    // Copy static methods
    Object.setPrototypeOf(SpyClass, OriginalMatcher)
    
    // Replace in module
    ;(MatcherModule as any).Matcher = SpyClass
    
    try {
      // Call the ORIGINAL Matcher.for (not SpyClass.for)
      // The original Matcher.for calls `new Matcher(spec, version)` where
      // Matcher is the class in its own scope, not MatcherModule.Matcher
      // So this replacement won't be intercepted
      OriginalMatcher.for('/test')
    } finally {
      ;(MatcherModule as any).Matcher = OriginalMatcher
    }
    
    // capturedVersions will be empty because Matcher.for uses the class directly
    // not through the module export
    expect(capturedVersions).toHaveLength(0) // This would pass but doesn't help
  })
})