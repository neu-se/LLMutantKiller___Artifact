import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('rejects path with adjacent wildcard and non-slash char in version 1', () => {
    // /foo* should be rejected in version 1 by original, but mutated regex [^/][^*+] won't match 'o*'
    expect(() => new Matcher('/foo*', '1')).toThrow('Path contains malformed wildcards')
  })
})