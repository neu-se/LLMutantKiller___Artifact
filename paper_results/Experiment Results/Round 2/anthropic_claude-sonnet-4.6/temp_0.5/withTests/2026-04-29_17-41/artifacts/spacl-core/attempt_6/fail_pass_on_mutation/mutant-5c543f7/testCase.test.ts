import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('treats a segment with colon followed by a single valid character as a capture', () => {
    // Test that /:a properly creates a capture (not a literal)
    // and that a literal /foo does NOT create a capture
    const captureMatcher = Matcher.for('/:a')
    const literalMatcher = Matcher.for('/foo')
    
    // Capture matcher should have props, literal should not
    expect(captureMatcher.props).toEqual(['a'])
    expect(literalMatcher.props).toEqual([])
    
    // Capture matcher regex source should differ from literal
    expect(captureMatcher.source).not.toBe(literalMatcher.source)
    
    // The capture should actually capture the value
    const result = '/test'.match(captureMatcher)
    expect(result).not.toBeNull()
    expect(result![1]).toBe('test')
  })
})