import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher malformed wildcard detection', () => {
  it('rejects /foo* as malformed wildcard but accepts /foo/bar as valid', () => {
    // /foo* should be rejected (non-slash followed by wildcard)
    expect(() => new Matcher('/foo*')).toThrow('Path contains malformed wildcards')
    // /foo/bar should be accepted - but mutated code uses [^/][^*+] which matches 'fo'
    // causing valid paths with consecutive non-wildcard chars to be incorrectly rejected
    expect(() => new Matcher('/foo/bar')).not.toThrow()
  })
})