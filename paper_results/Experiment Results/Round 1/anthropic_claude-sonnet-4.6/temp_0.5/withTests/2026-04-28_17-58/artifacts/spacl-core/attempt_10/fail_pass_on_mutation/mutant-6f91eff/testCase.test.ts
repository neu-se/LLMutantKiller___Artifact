import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('accepts multi-character literal path segment in version 1.1', () => {
    // Original v1.1 regex [^/][*+] only rejects non-slash followed by wildcard
    // Mutated v1.1 regex [^/][^*+] incorrectly rejects non-slash followed by any non-wildcard
    const m = new Matcher('/foo', '1.1')
    expect(m.spec).toBe('/foo')
    expect('/foo'.match(m)).not.toBeNull()
  })
})