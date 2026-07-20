import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher capture segment with single-character name', () => {
  it('correctly captures a single-character named segment and populates props', () => {
    const matcher = Matcher.for('/:a')
    expect(matcher.props).toEqual(['a'])
    const result = '/hello'.match(matcher)
    expect(result).not.toBeNull()
    expect(result![1]).toBe('hello')
  })
})