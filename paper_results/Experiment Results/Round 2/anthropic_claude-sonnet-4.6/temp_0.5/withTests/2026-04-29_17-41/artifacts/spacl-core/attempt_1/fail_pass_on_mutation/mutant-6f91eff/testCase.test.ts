import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher wildcard validation', () => {
  it('accepts a valid literal path /foo and does not throw for non-wildcard characters', () => {
    // The original code uses /[*+][^/]|[^/][*+]/ to detect malformed wildcards.
    // The mutated code uses /[*+][^/]|[^/][^*+]/ which incorrectly matches
    // any two adjacent non-slash characters (like 'fo' in '/foo'), causing valid
    // paths to be rejected.
    expect(() => new Matcher('/foo')).not.toThrow()
  })
})