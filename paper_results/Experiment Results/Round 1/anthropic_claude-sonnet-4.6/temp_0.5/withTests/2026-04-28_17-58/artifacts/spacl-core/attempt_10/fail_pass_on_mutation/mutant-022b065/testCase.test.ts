import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('should reject trailing slash in version 1 specs', () => {
    expect(() => Matcher.for('/foo/', '1')).toThrow('Path must not end with a slash')
    expect(() => Matcher.for('/foo/', '1.0')).toThrow('Path must not end with a slash')
    expect(() => Matcher.for('/foo/', '1.1')).toThrow('Path must not end with a slash')
    expect(() => Matcher.for('/', '1')).not.toThrow()
    expect(() => Matcher.for('/', '1.0')).not.toThrow()
    expect(() => Matcher.for('/', '1.1')).not.toThrow()
  })
})