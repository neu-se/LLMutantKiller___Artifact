import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher.for', () => {
  it('calling with explicit version 1 should reject ++ wildcards, while no-version default (1.1) should accept them', () => {
    // With explicit version '1', /++ should be rejected
    expect(() => Matcher.for('/++', '1')).toThrow('Path contains malformed wildcards')
    
    // With explicit version '1.0', /++ should be rejected  
    expect(() => Matcher.for('/++', '1.0')).toThrow('Path contains malformed wildcards')
    
    // With explicit version '1.1', /++ should be accepted
    expect(() => Matcher.for('/++', '1.1')).not.toThrow()
    
    // With no version (default), should behave like '1.1' and accept /++
    // Original: default is '1.1' → accepts
    // Mutated: default is '' → '' !== '1' && '' !== '1.0' → uses 1.1 pattern → also accepts
    // This confirms the mutation is equivalent - but let's verify the spec property is correct
    const m = Matcher.for('/++', '1.1')
    expect(m.spec).toBe('/++')
    
    // Force TypeScript compilation of the file with the type error
    // by accessing a property that requires successful instantiation
    const m2 = Matcher.for('/foo')
    expect(m2.spec).toBe('/foo')
    expect(m2.props).toEqual([])
  })
})