import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'
import { describe, it } from '@jest/globals'

describe('matcher', () => {
  it('should correctly handle capture segments with two character names', () => {
    const matcher = Matcher.for('/:ab')
    const result = '/test'.match(matcher)
    expect(result).not.toBeNull()
    expect(result?.[1]).toBe('test')
    expect(matcher.props).toEqual(['ab'])
  })
})