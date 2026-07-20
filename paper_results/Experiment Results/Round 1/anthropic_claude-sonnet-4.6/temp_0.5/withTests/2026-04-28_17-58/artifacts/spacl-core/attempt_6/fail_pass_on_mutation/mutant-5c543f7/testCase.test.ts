import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('correctly compiles capture segment with dot in name', () => {
    const matcher = Matcher.for('/:.') 
    // Should match any single segment and capture its value
    const result = '/hello'.match(matcher)
    expect(result).not.toBeNull()
    expect(result![1]).toBe('hello')
    // Props should contain '.'
    expect(matcher.props).toEqual(['.'])
  })
})