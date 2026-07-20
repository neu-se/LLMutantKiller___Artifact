import { describe, it, expect } from '@jest/globals'
import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('rule matches with alternation capture and missing context property', () => {
  it('detects mutation by finding path where regex matches with undefined capture group', () => {
    // The mutation replaces `prop === undefined` with `false`
    // Only observable difference: when prop===undefined AND match[index+1]===undefined
    // Original: true || false => return false (no match)  
    // Mutated:  false || false => don't return false => returns true (match!)
    //
    // JS regex alternation can produce undefined captures:
    // e.g. /^\/foo$|^\/([^/]+)$/ matching '/foo' gives match[1]=undefined
    //
    // Construct a Matcher with alternation so one branch has no capture
    // We'll use the internal structure that Matcher uses
    
    // First, let's see what spec produces alternation with captures
    // From tests: '/++' => /^\/$|^\/[^/]+$/  (no captures, just alternation)
    // A spec like '/:foo' with optional behavior might use alternation
    
    // Build a synthetic Matcher: a RegExp with alternation where
    // one branch captures and one doesn't, plus props=['foo']
    // Pattern: /^\/foo$|^\/([^/]+)$/ - matches '/foo' with match[1]=undefined
    //          or '/bar' with match[1]='bar'
    
    // We'll subclass or directly manipulate to get the right structure
    // Since Matcher extends RegExp, we can use a workaround:
    // Create the regex, then attach props to it
    
    const re = /^\/foo$|^\/([^/]+)$/ as any
    re.props = ['foo']
    re.spec = '/:foo'
    
    // Verify: '/foo'.match(re) gives match[1]=undefined
    const m = '/foo'.match(re)
    expect(m).not.toBeNull()
    expect(m![1]).toBeUndefined()
    
    const rule = new Rule(re as Matcher)
    rule.allow('get')
    
    // path='/foo' matches regex via first branch, match[1]=undefined
    // ctx={} so prop=ctx['foo']=undefined
    // Original: (undefined===undefined) || (undefined!==undefined) => true => return false => matches()=false
    // Mutated:  false || (undefined!==undefined) => false => don't return false => matches()=true
    expect(rule.matches('/foo', {})).toBe(false)
  })
})