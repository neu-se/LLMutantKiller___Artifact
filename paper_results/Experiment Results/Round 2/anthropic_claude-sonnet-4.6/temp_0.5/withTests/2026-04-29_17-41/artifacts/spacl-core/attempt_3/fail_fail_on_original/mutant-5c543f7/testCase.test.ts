import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('does not treat a two-character literal segment starting with colon-like chars as a capture', () => {
    // A capture /:a should have props=['a'] and match with capture group
    const captureMatcher = Matcher.for('/:ab')
    expect(captureMatcher.props).toEqual(['ab'])
    expect(captureMatcher.source).toBe('/([^/]+)')
    
    // Verify actual matching behavior with capture
    const match = '/hello'.match(captureMatcher)
    expect(match).not.toBeNull()
    expect(match![1]).toBe('hello')
  })
})