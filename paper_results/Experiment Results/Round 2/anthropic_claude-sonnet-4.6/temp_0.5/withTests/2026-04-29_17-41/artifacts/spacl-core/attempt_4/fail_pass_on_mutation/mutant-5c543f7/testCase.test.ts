import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('correctly compiles capture segments and matches paths with captured values', () => {
    const matcher = Matcher.for('/:foo')
    expect(matcher.props).toEqual(['foo'])
    const match = '/hello'.match(matcher)
    expect(match).not.toBeNull()
    expect(match![1]).toBe('hello')
    expect('/'.match(matcher)).toBeNull()
    expect('/hello/world'.match(matcher)).toBeNull()
  })
})