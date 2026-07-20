import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('correctly compiles a capture segment with a single-character name into the regex source', () => {
    const matcher = Matcher.for('/:a')
    // The compiled regex should contain a capture group ([^/]+)
    // and props should contain 'a'
    expect(matcher.source).toContain('([^/]+)')
    expect(matcher.props).toEqual(['a'])
    // Verify it actually captures
    const match = '/test'.match(matcher)
    expect(match).not.toBeNull()
    expect(match![1]).toBe('test')
    // Verify a non-matching path doesn't match
    const noMatch = '/test/extra'.match(matcher)
    expect(noMatch).toBeNull()
  })
})