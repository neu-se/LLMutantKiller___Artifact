import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('correctly orders props for multiple captures processed in reverse', () => {
    const matcher = Matcher.for('/:first/:second/:third')
    expect(matcher.props).toEqual(['first', 'second', 'third'])
    const result = '/a/b/c'.match(matcher)
    expect(result).not.toBeNull()
    expect(result![1]).toBe('a')
    expect(result![2]).toBe('b')
    expect(result![3]).toBe('c')
  })
})