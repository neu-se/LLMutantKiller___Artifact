import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('correctly identifies capture in path with mixed literal and capture segments', () => {
    const matcher = Matcher.for('/api/:version/users')
    expect(matcher.props).toEqual(['version'])
    expect('/api/v1/users'.match(matcher)).not.toBeNull()
    expect('/api/v1/users'.match(matcher)![1]).toBe('v1')
    expect('/api/users'.match(matcher)).toBeNull()
  })
})