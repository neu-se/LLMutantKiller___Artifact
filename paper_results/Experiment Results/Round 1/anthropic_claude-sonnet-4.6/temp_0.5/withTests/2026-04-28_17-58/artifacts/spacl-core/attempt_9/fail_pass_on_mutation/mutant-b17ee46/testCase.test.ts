import { describe, it, expect } from '@jest/globals'

describe('Matcher module', () => {
  it('should load and allow Matcher.for to be called with version 1 to reject ++ wildcards', async () => {
    const mod = await import('../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts')
    const { Matcher } = mod
    
    // Verify the module loaded correctly and Matcher.for works
    expect(typeof Matcher.for).toBe('function')
    
    // With version '1', ++ should be rejected (malformed wildcard in v1)
    expect(() => Matcher.for('/++', '1')).toThrow()
    
    // With no version argument (default should be '1.1'), ++ should be accepted
    expect(() => Matcher.for('/++')).not.toThrow()
    
    // The default version should produce a matcher that accepts the root path for /++
    const m = Matcher.for('/++')
    expect('/'.match(m)).not.toBeNull()
  })
})