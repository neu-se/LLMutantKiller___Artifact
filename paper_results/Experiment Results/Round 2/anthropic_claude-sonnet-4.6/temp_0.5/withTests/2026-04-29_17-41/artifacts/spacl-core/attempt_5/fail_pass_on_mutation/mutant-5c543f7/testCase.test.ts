import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('compiles a path with only a colon-prefixed single-char segment as a capture group', () => {
    // With original /:.+/, part ':a' matches (one or more chars after colon)
    // With mutated /:./, part ':a' also matches (one char after colon)
    // The difference: test a segment where the name is empty after slice
    // Actually test that the regex source is correct for a capture
    const m = Matcher.for('/:a')
    // Should compile to a capture group regex
    expect(m.source).toBe('^\\/([^/]+)$')
    expect(m.props).toEqual(['a'])
  })
})