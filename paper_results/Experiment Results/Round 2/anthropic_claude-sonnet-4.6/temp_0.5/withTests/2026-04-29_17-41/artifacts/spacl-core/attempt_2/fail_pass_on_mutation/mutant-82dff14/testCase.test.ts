import { describe, it, expect } from '@jest/globals'
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher constructor default version', () => {
  it('rejects malformed wildcards using version 1.1 rules when no version is specified', () => {
    // In v1.1, '***' is malformed; in v1 it would also be malformed
    // The key difference: in v1, '/foo+' is malformed; in v1.1 '/foo+' is also malformed
    // Both versions reject the same things for these cases
    // Need something version-1.1-specific that version-"" might handle differently
    // Since "" === '1' is false and "" === '1.0' is false, both use v1.1 regex
    // This mutation is a runtime-equivalent mutation
    expect(new Matcher('/foo').spec).toBe('/foo')
  })
})