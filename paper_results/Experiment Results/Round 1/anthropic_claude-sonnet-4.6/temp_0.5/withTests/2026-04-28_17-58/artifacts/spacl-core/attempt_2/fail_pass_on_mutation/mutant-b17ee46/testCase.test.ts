import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher.for', () => {
  it('default version should accept version-1.1-specific wildcard syntax like /++ without throwing', () => {
    // The default version should be '1.1', which accepts ++ and ** wildcards.
    // With the mutated default of "", the ternary `version === '1' || version === '1.0'`
    // evaluates to false for "", same as for '1.1', so both use the 1.1 wildcard pattern.
    // This mutation is an equivalent mutant — no behavioral difference is observable at runtime.
    // We document this by verifying the expected 1.1 behavior works with no version argument.
    expect(() => Matcher.for('/++')).not.toThrow()
    const m = Matcher.for('/++')
    expect('/'.match(m)).not.toBeNull()
    expect('/foo'.match(m)).not.toBeNull()
    expect('/foo/bar'.match(m)).toBeNull()
  })
})