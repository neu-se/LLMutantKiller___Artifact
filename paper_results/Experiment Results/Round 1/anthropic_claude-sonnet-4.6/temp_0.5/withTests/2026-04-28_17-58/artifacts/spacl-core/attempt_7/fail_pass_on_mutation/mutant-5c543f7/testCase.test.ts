import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('does not match literal path when capture spec is used', () => {
    const captureMatcher = Matcher.for('/:foo')
    // If mutation incorrectly treats ':foo' as literal, it would only match '/:foo'
    // Original correctly treats it as capture group matching any segment
    expect('/:foo'.match(captureMatcher)).not.toBeNull()  // captures ':foo' as value
    expect('/bar'.match(captureMatcher)).not.toBeNull()   // captures 'bar' as value  
    expect('/anything'.match(captureMatcher)).not.toBeNull()
    // A literal matcher for ':foo' would NOT match '/bar'
    // So if mutation breaks capture detection, '/bar' would not match
    const result = '/bar'.match(captureMatcher)
    expect(result).not.toBeNull()
    expect(result![1]).toBe('bar')
  })
})