import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher trailing slash validation', () => {
  it('should accept a valid path spec without trailing slash and store spec correctly', () => {
    const m = Matcher.for('/foo/bar')
    expect(m.spec).toBe('/foo/bar')
    expect(m.props).toEqual([])
    expect(() => Matcher.for('/foo/bar/')).toThrow('Path must not end with a slash')
    expect(() => Matcher.for('/foo/')).toThrow('Path must not end with a slash')
    expect(() => Matcher.for('/*/')).toThrow('Path must not end with a slash')
  })
})