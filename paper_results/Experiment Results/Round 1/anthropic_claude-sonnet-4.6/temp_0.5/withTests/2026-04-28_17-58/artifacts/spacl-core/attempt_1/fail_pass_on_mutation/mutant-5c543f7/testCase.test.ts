import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher capture segment detection', () => {
  it('correctly identifies capture segments with single-character names and compiles them to capture groups', () => {
    // A capture segment like /:a should compile to a regex with a capture group /([^/]+)
    // and the prop 'a' should be in the props array.
    // The mutation changes /:.+/ to /:./  which are functionally equivalent for detection,
    // but we need to find a case where they differ.
    // Actually the key difference: with the original /:.+/, a part like ':a' (single char)
    // matches because .+ matches one or more. With /:./  ':a' also matches.
    // They are equivalent... Let's test that capture works correctly for a single-char name.
    const matcher = Matcher.for('/:a')
    expect(matcher.props).toEqual(['a'])
    const result = '/hello'.match(matcher)
    expect(result).not.toBeNull()
    expect(result![1]).toBe('hello')

    // Test that a path like /foo is treated as a literal, not a capture
    const literalMatcher = Matcher.for('/foo')
    expect(literalMatcher.props).toEqual([])
    expect('/foo'.match(literalMatcher)).not.toBeNull()
    expect('/bar'.match(literalMatcher)).toBeNull()
  })
})