import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('correctly handles the opt flag interaction with capture segments at the end of path', () => {
    // A trailing capture segment should affect opt behavior
    // /:foo should match exactly one segment
    const m1 = Matcher.for('/:foo')
    // Should NOT match root /
    expect('/'.match(m1)).toBeNull()
    // Should match single segment
    expect('/bar'.match(m1)).not.toBeNull()
    // Should NOT match two segments  
    expect('/bar/baz'.match(m1)).toBeNull()
    
    // Two captures
    const m2 = Matcher.for('/:foo/:bar')
    expect('/'.match(m2)).toBeNull()
    expect('/a'.match(m2)).toBeNull()
    expect('/a/b'.match(m2)).not.toBeNull()
    expect('/a/b/c'.match(m2)).toBeNull()
    // Captured values
    const result = '/hello/world'.match(m2)
    expect(result![1]).toBe('hello')
    expect(result![2]).toBe('world')
  })
})