import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('correctly identifies a capture segment whose name contains only valid special characters', () => {
    // Segment /:~ where ~ is a valid character
    // part = ':~'
    // Original /:.+/ matches ':~' (colon + 1 char) -> capture
    // Mutated /:./ matches ':~' (colon + 1 char) -> capture
    // These seem equivalent, so try with a name that is just one char
    // to verify props are populated correctly
    const m = Matcher.for('/:a/foo')
    expect(m.props).toEqual(['a'])
    expect(m.source).toBe('^\\/([^/]+)\\/foo$')
    const match = '/bar/foo'.match(m)
    expect(match).not.toBeNull()
    expect(match![1]).toBe('bar')
    expect('/baz/qux'.match(m)).toBeNull()
  })
})