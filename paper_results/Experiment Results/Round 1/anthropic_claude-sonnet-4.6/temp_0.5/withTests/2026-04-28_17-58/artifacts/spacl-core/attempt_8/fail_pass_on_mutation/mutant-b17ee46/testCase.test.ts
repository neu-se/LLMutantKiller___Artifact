import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('Matcher.for with no version should match paths the same as explicit version 1.1', () => {
    const withDefault = Matcher.for('/foo/+')
    const with11 = Matcher.for('/foo/+', '1.1')
    
    const testPaths = ['/foo/bar', '/foo', '/foo/bar/baz', '/', '/foo/']
    
    for (const path of testPaths) {
      const r1 = path.match(withDefault)
      const r2 = path.match(with11)
      // Both should produce identical results
      expect(r1 === null).toBe(r2 === null)
    }
    
    // The source regex should be identical
    expect(withDefault.source).toBe(with11.source)
    expect(withDefault.spec).toBe(with11.spec)
    expect(withDefault.props).toEqual(with11.props)
  })
})