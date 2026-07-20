import { Matcher } from '../src/matcher'
import { describe, it } from '@jest/globals'

describe('matcher', () => {
  it('should correctly handle capture segments with single character names', () => {
    const matcher = Matcher.for('/:a')
    const result = '/test'.match(matcher)
    expect(result).not.toBeNull()
    expect(result?.[1]).toBe('test')
  })
})