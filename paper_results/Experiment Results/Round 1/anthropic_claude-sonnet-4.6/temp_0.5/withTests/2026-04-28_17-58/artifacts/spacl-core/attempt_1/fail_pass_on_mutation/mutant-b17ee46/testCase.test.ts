import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher.for default version parameter', () => {
  it('should use version 1.1 as default, accepting match-one-or-none (++) and match-many-or-none (**) wildcards', () => {
    // In version 1.1, ++ and ** wildcards are valid
    // In the mutated code, the default version is "" (empty string), which is neither '1', '1.0', nor '1.1'
    // The version check uses: version === '1' || version === '1.0' ? /old pattern/ : /new pattern/
    // With version "", it falls to the new pattern check (1.1 behavior) for wildcard validation
    // BUT the malformed wildcard check for version 1.1 is: /\*[^*/]|\+[^+/]|[^/*]\*|[^/+]\+|\*\*\*|\+\+\+/
    // With ++ spec, the original (version 1.1) should NOT throw, but let's verify the actual behavior difference
    
    // The key difference: with version "" as default, the behavior for specs like /++ should still work
    // because "" !== '1' and "" !== '1.0', so it uses the 1.1 regex pattern for wildcard validation
    // However, we need to find a case where the empty string default causes different behavior
    
    // Actually the mutation changes the DEFAULT value. If we call Matcher.for(spec) without a version,
    // the original uses '1.1' and the mutated uses ''.
    // The wildcard validation: version === '1' || version === '1.0' ? old : new
    // With '': uses new (1.1) pattern - same as original
    // So for wildcard validation, behavior is the same
    
    // BUT: the spec validation for version 1 rejects ++ and **
    // With version '1.1' (original default): ++ and ** are valid
    // With version '' (mutated default): also uses 1.1 pattern, so ++ and ** are valid
    
    // Let me reconsider: the mutation changes default from '1.1' to ''
    // The type signature says version: '1' | '1.0' | '1.1' = '1.1'
    // With '' as default, the ternary `version === '1' || version === '1.0'` is false
    // so it uses the 1.1 wildcard pattern - same behavior for wildcards
    
    // The real difference would be if the Matcher stores the version or if it's passed somewhere
    // Looking at the code, version is only used in the malformed wildcards check
    // So the mutation would only matter if we pass a spec that has wildcards that differ between versions
    
    // With version '1' explicitly vs default:
    // Original default '1.1': /++ is valid
    // Mutated default '': /++ is also valid (since '' !== '1' && '' !== '1.0')
    
    // The test needs to verify that calling Matcher.for('/++') without explicit version
    // works correctly (accepts the spec) - this should pass in both original and mutated
    
    // Wait - let me re-read. The mutation changes the DEFAULT. To detect this mutation,
    // we need a test where passing no version argument gives different behavior.
    // Since both '1.1' and '' result in using the new wildcard pattern, they behave the same for wildcards.
    
    // The only observable difference would be if the version value itself is exposed or used elsewhere.
    // Since it's not stored and only used in the one check, and both '' and '1.1' fall to the same branch...
    // 
    // Actually, let me verify: with version '', the check `version === '1' || version === '1.0'` is false,
    // so it uses the 1.1 pattern. With version '1.1', same result. So behavior IS the same.
    //
    // But wait - what if we call Matcher.for('/++', '1') explicitly? That should throw.
    // And Matcher.for('/++') without version should NOT throw (original '1.1' default).
    // With mutated '' default, it also should not throw.
    //
    // The mutation seems undetectable through behavior... unless TypeScript type checking catches it.
    // Let's write a test that verifies the default behavior works correctly for 1.1-specific features.
    
    expect(() => Matcher.for('/++')).not.toThrow()
    expect(() => Matcher.for('/**')).not.toThrow()
    
    // Verify that version '1' rejects these (to confirm the version check works)
    expect(() => Matcher.for('/++', '1')).toThrow()
    expect(() => Matcher.for('/**', '1.0')).toThrow()
    
    // The default should behave like '1.1', not like '1' or '1.0'
    // Both original and mutated pass the above, but let's ensure the matcher actually works
    const matcher = Matcher.for('/++')
    expect('/'.match(matcher)).not.toBeNull()
    expect('/foo'.match(matcher)).not.toBeNull()
    expect('/foo/bar'.match(matcher)).toBeNull()
  })
})