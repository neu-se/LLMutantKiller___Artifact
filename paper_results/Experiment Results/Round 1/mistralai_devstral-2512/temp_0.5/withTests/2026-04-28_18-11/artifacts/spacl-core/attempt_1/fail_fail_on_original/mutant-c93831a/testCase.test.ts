import { Matcher } from '../src'

describe('Matcher Symbol.match behavior', () => {
  it('should return null for strings ending with a trailing slash', () => {
    const matcher = Matcher.for('/foo')
    const result = matcher[Symbol.match]('/foo/')
    expect(result).toBeNull()
  })
})