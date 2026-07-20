import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'
import { describe, it } from '@jest/globals'

describe('matcher', () => {
  it('should correctly handle capture segments with single character names in version 1.0', () => {
    const matcher = Matcher.for('/:a', '1.0')
    const result = '/test'.match(matcher)
    expect(result).not.toBeNull()
    expect(result?.[1]).toBe('test')
    expect(matcher.props).toEqual(['a'])
  })
})