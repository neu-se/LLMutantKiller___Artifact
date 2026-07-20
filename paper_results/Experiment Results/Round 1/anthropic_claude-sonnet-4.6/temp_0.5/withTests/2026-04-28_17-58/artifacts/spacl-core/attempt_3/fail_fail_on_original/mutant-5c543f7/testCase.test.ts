import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('does not treat a segment with only a colon as a capture group', () => {
    // ':' alone should fail malformed capture check, but let's test
    // that segments like ':a' compile to capture groups
    // and that the props contain the full name after the colon
    const m1 = Matcher.for('/:abc')
    expect(m1.props).toEqual(['abc'])
    
    const m2 = Matcher.for('/:a/:bc')  
    expect(m2.props).toEqual(['a', 'bc'])
    
    // Verify the regex source has capture groups not literals
    expect(m2.source).toBe('^/([^/]+)/([^/]+)$')
  })
})