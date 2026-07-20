import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'
import { describe, it } from '@jest/globals'

describe('matcher capture validation', () => {
  it('should correctly handle capture segments with single character names', () => {
    const matcher = Matcher.for('/:a/b')
    const result = '/test/b'.match(matcher)
    expect(result).not.toBeNull()
    expect(result?.[1]).toBe('test')
  })
})