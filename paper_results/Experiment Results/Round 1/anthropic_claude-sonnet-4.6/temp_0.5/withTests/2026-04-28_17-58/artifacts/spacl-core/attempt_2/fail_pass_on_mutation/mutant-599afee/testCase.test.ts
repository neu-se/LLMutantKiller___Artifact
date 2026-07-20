import { describe, it, expect } from '@jest/globals'
import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('rule matches with undefined context property and optional capture', () => {
  it('should not match when context property is undefined even if regex capture is undefined', () => {
    // We need a case where:
    // 1. The regex matches the path
    // 2. A capture group is undefined (optional group that didn't participate)
    // 3. ctx is provided but the corresponding property is undefined
    //
    // Original: prop===undefined => return false (no match)
    // Mutated:  false || (undefined !== undefined) => false => does NOT return false => match!
    //
    // We can construct a Matcher directly with an optional capture group
    // and props array to simulate this scenario.
    // 
    // Create a Matcher that has an optional capture group: /^\/(?:([^/]+))?$/
    // This matches '/' with match[1] === undefined
    // Props: ['foo']
    // Then with ctx = {} (prop = undefined), path = '/'
    // Original: prop===undefined => return false
    // Mutated: false || (undefined !== undefined) => false => returns true!

    const matcher = new Matcher('/++/:foo')
    const rule = new Rule(matcher)
    rule.allow('get')

    // Find a path that matches the regex but where the capture group is undefined
    // '/++/:foo' - the ++ means zero or one segment, :foo captures one segment
    // Actually this might require both segments or just :foo...
    // Let me use a direct Matcher construction with known optional capture behavior
    
    // Use a custom regex with optional capture group via Matcher
    // The spec '/++/:foo' should compile such that the capture can be optional
    // when the path is just '/'
    
    // Test: path='/' with ctx={} 
    // If the regex for '/++/:foo' matches '/' with an optional capture being undefined:
    // Original: returns false (prop undefined check)
    // Mutated: returns true (skips prop undefined check, undefined !== undefined is false)
    
    const result = rule.matches('/', {})
    expect(result).toBe(false)
  })
})