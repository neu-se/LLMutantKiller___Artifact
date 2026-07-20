import { describe, it, expect } from '@jest/globals'
import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('rule matches with optional capture group and missing context property', () => {
  it('should return false when ctx property is undefined and regex capture group is also undefined', () => {
    // The mutation replaces `prop === undefined` with `false`
    // Only observable when prop===undefined AND match[index+1]===undefined:
    // Original: (undefined===undefined)||(undefined!==undefined) => true => return false
    // Mutated:  false||(undefined!==undefined) => false => returns true (match!)
    //
    // Strategy: get a real Matcher instance, then override its props and regex behavior
    // by creating a subclass instance that uses alternation regex pattern
    //
    // We need a Matcher where:
    // 1. props.length > 0 (so the loop runs)
    // 2. The regex matches a path with match[1] === undefined
    //
    // Use Matcher.for('/:foo') as base, then create a new Matcher-like object
    // that has alternation: /^\/foo$|^\/([^/]+)$/
    // When path='/foo', match[1]=undefined
    // With ctx={} (prop=undefined), original returns false, mutated returns true

    // Get a real Matcher to use as prototype basis
    const baseMatcher = Matcher.for('/:foo')
    
    // Create a new RegExp with alternation that has an optional capture
    // and make it look like a Matcher by copying the prototype
    const altRegex = new RegExp('^/foo$|^/([^/]+)$')
    
    // Copy Matcher prototype methods onto our regex
    Object.setPrototypeOf(altRegex, Object.getPrototypeOf(baseMatcher))
    
    // Set the props property (Matcher stores this as own property)
    Object.defineProperty(altRegex, 'props', {
      value: ['foo'],
      writable: false,
      enumerable: true,
      configurable: true
    })
    Object.defineProperty(altRegex, 'spec', {
      value: '/:foo',
      writable: false,
      enumerable: true,
      configurable: true
    })
    
    // Verify our setup: '/foo' should match with match[1]=undefined
    const testMatch = '/foo'.match(altRegex)
    expect(testMatch).not.toBeNull()
    expect(testMatch![1]).toBeUndefined()
    
    // Now use this as a Matcher in Rule
    // Rule constructor: if spec instanceof Matcher, use directly
    // So we need altRegex to pass instanceof Matcher check
    const rule = new Rule(altRegex as unknown as Matcher)
    rule.allow('get')
    
    // path='/foo' matches regex via first branch, match[1]=undefined
    // ctx={} so prop=ctx['foo']=undefined
    // Original: prop===undefined => return false => matches()=false
    // Mutated:  false||(undefined!==undefined) => false => matches()=true
    expect(rule.matches('/foo', {})).toBe(false)
  })
})