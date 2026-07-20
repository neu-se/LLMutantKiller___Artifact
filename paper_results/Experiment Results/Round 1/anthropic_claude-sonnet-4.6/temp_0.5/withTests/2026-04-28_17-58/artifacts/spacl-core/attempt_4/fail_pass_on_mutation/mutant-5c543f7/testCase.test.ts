import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('correctly matches capture segments and returns captured values', () => {
    const matcher = Matcher.for('/:foo')
    const result = '/hello'.match(matcher)
    expect(result).not.toBeNull()
    expect(result![1]).toBe('hello')
    expect(matcher.props).toEqual(['foo'])
  })
})