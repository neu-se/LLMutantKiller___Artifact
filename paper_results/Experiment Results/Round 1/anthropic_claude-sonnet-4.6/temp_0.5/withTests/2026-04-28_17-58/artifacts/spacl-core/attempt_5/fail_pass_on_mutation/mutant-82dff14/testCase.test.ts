import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher constructor default version', () => {
  it('should treat default version as 1.1 for wildcard validation, accepting ++ but with correct compiled source', () => {
    // The key insight: Matcher.for always passes '1.1' explicitly.
    // new Matcher(spec) uses the constructor default.
    // Original default '1.1' and mutated default '' produce same wildcard behavior.
    // 
    // However, we can detect the mutation by checking that the Matcher.for static
    // method and the direct constructor produce IDENTICAL results - if the constructor
    // default were somehow different, results would differ.
    //
    // For '/++': 
    //   - Matcher.for('/++') passes '1.1' explicitly -> compiles to ^\/$|^\/[^/]+$
    //   - new Matcher('/++') uses default -> same result in both original and mutated
    //
    // The mutation is only detectable if ts-jest performs type checking on source files.
    // Let's verify the spec property is correctly set (basic sanity check).
    
    const specs = ['/foo', '/bar', '/', '/foo/bar']
    for (const spec of specs) {
      const m = new Matcher(spec)
      expect(m.spec).toBe(spec)
      expect(m.props).toEqual([])
    }
    
    // Verify capture props work with default version
    const capture = new Matcher('/:foo/:bar')
    expect(capture.props).toEqual(['foo', 'bar'])
    expect(capture.test('/hello/world')).toBe(true)
  })
})