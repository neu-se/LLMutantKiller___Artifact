import { describe, it, expect } from '@jest/globals'
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('new Matcher without version behaves identically to Matcher.for with version 1.1', () => {
    // Test a spec that version '1' would REJECT but '1.1' accepts
    const specV11Only = '/foo/++'
    
    // Matcher.for always uses explicit '1.1'
    const viaStaticFor = Matcher.for(specV11Only)
    
    // new Matcher() uses the default - should be '1.1'
    const viaConstructor = new Matcher(specV11Only)
    
    // Both should produce identical regex sources
    expect(viaConstructor.source).toBe(viaStaticFor.source)
    
    // And both should match the same paths
    expect('/foo'.match(viaConstructor)).not.toBeNull()
    expect('/foo/bar'.match(viaConstructor)).not.toBeNull()
    expect('/foo/bar/baz'.match(viaConstructor)).toBeNull()
  })
})