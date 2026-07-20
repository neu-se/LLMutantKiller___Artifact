import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher wildcard validation', () => {
  it('accepts valid paths containing wildcards preceded by slashes', () => {
    // /foo/* is valid - wildcard after slash is correct syntax
    // Original code: [^/][*+] catches non-slash before wildcard (foo* invalid)
    // Mutated code: [/][*+] catches slash before wildcard (/foo/* invalid - wrong!)
    expect(() => Matcher.for('/foo/*')).not.toThrow()
  })
})