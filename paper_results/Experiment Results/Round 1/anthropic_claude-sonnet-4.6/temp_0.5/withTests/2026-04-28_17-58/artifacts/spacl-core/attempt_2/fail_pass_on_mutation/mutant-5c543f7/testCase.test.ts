import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('treats a single-character segment starting with colon as a capture group, not a literal', () => {
    // /:a should be a capture (props=['a']), not a literal matching the string ':a'
    const matcher = Matcher.for('/:a')
    // Should match /hello and capture 'hello', not match '/:a' literally
    expect(matcher.props).toEqual(['a'])
    // The source should contain a capture group, not a literal colon
    expect(matcher.source).toContain('([^/]+)')
    expect(matcher.source).not.toContain(':a')
    // Should match any single segment
    expect('/hello'.match(matcher)).not.toBeNull()
    // Should NOT match the literal string ':a' as if it were a literal segment
    // (both original and mutant handle this the same way...)
    expect('/:a'.match(matcher)).not.toBeNull() // captures ':a' as value
  })
})