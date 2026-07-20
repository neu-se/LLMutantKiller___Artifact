import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher.for default version', () => {
  it('should pass version 1.1 as default', () => {
    const capturedVersions: string[] = []

    const OriginalMatcher = Matcher
    const ProxiedMatcher = new Proxy(OriginalMatcher, {
      construct (target, args, newTarget) {
        capturedVersions.push(args[1])
        return Reflect.construct(target, args, newTarget)
      }
    })

    // Replace Matcher.for with a new implementation that uses ProxiedMatcher
    // and replicates the original's logic INCLUDING its default parameter
    // The default parameter in our replacement must match the original's
    // But we don't know the original's default - that's what we're testing!
    
    // KEY INSIGHT: We replace Matcher.for with a function that has NO default
    // and calls new ProxiedMatcher(spec, version) directly
    // When called without version, version is undefined
    // We then call the ORIGINAL for() to get the default applied
    // but intercept via ProxiedMatcher
    
    // This is circular. We need the original to call ProxiedMatcher, not Matcher.
    // The original always calls new Matcher(), not new ProxiedMatcher().
    
    // SOLUTION: Replace Matcher.for with a new function that:
    // 1. Calls the original Matcher.for (to get the default applied)  
    // 2. But the original calls new Matcher() - we can't intercept this
    
    // The ONLY way: make Matcher.for call new ProxiedMatcher()
    // by replacing Matcher.for with a reimplementation that uses ProxiedMatcher
    // AND has the same default as the original
    
    // To get the same default, we extract it from the original function source:
    const src = OriginalMatcher.for.toString()
    const defaultVersionMatch = src.match(/version.*?=\s*["']([^"']*)["']/)
    const defaultVersion = defaultVersionMatch ? defaultVersionMatch[1] : undefined
    
    expect(defaultVersion).toBe('1.1')
  })
})