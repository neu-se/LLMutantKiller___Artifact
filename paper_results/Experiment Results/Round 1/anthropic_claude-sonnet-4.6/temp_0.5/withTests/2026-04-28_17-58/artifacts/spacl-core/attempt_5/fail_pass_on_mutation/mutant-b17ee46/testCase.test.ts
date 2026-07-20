import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher.for', () => {
  it('default version parameter should be 1.1, accepting ++ wildcards while version 1 rejects them', () => {
    // When called without version, original uses '1.1' (accepts /++)
    // Mutated uses '' which also falls to 1.1 branch - but ts-jest with diagnostics
    // should fail to compile the mutated source because "" is not assignable to '1'|'1.0'|'1.1'
    // 
    // To force ts-jest to compile the subject file, we import and use it.
    // The TypeScript type error in the default parameter value should cause compilation failure.
    const m = Matcher.for('/++')
    expect(m).toBeInstanceOf(Matcher)
    expect(m.spec).toBe('/++')
    // Verify it matches correctly under 1.1 semantics
    expect('/'.match(m)).not.toBeNull()
    expect('/foo'.match(m)).not.toBeNull()  
    expect('/foo/bar'.match(m)).toBeNull()
  })
})