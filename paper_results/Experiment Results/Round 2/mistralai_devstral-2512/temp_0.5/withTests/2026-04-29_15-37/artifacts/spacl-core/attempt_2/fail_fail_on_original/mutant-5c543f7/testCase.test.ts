import { Matcher } from '../src/matcher'
import { describe, it } from '@jest/globals'

describe('matcher capture validation', () => {
  it('should correctly handle capture segments with single character names', () => {
    const matcher = Matcher.for('/:a')
    const result = '/foo'.match(matcher)
    expect(result).not.toBeNull()
    expect(result?.[1]).toBe('foo')
  })
})