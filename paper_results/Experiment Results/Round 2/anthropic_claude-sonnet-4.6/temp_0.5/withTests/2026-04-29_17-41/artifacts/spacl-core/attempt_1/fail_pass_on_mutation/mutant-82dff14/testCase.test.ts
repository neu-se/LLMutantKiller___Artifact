import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher default version behavior', () => {
  it('should use version 1.1 as default, accepting ++ and ** wildcards without explicit version', () => {
    // With original code, default is '1.1' which accepts ++ and **
    // With mutated code, default is '' which also uses v1.1 regex path
    // The key: Matcher.for uses explicit '1.1', new Matcher() uses default
    // Test that new Matcher with version '1' rejects ++ but default accepts it
    expect(() => new Matcher('/foo/++')).not.toThrow()
    expect(() => new Matcher('/foo/**')).not.toThrow()
    expect(() => new Matcher('/foo/++', '1')).toThrow()
  })
})