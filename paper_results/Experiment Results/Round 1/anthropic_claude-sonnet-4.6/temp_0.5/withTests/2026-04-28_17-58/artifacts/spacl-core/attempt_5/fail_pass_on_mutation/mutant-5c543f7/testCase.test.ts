import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('compiles /: followed by dot as capture with dot prop name and matches any segment', () => {
    const matcher = Matcher.for('/:.') 
    expect(matcher.props).toEqual(['.'])
    const result = '/anything'.match(matcher)
    expect(result).not.toBeNull()
    expect(result![1]).toBe('anything')
    // Should NOT match literal ':.' as a fixed string
    const literalMatcher = Matcher.for('/.foo')
    expect('/.foo'.match(literalMatcher)).not.toBeNull()
    expect('/bar'.match(literalMatcher)).toBeNull()
  })
})