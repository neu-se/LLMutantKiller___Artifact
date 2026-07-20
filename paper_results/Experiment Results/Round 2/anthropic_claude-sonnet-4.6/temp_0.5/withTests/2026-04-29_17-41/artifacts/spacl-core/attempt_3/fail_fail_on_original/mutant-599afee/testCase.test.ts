import { describe, it, expect } from '@jest/globals'
import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('rule', () => {
  it('does not match when context property is undefined and the regex capture group is also undefined', () => {
    // Mutation: `prop === undefined` replaced with `false`
    // Original: if (prop === undefined || match[index + 1] !== prop) { return false }
    // Mutated:  if (false || match[index + 1] !== prop) { return false }
    //
    // When prop === undefined AND match[index + 1] === undefined:
    //   Original: true || false => true => return false (no match) ✓
    //   Mutated:  false || false => false => does NOT return false => returns true (match!) ✗
    //
    // We need a Matcher with an optional capture group so match[1] can be undefined.
    // The Rule constructor accepts a Matcher instance directly (bypassing string validation).
    // We create a Matcher from a valid spec, then override its internals to add an optional capture.

    // First create a valid Matcher from a real spec to get the right prototype
    const baseMatcher = Matcher.for('/:name')
    
    // Now create a new RegExp with an optional capture group
    // /^\/(?:([^/]+))?$/ matches '/' (capture=undefined) or '/foo' (capture='foo')
    const optionalCaptureRegex = /^\/(?:([^/]+))?$/
    
    // Create a proper Matcher instance using Object.create to get the right prototype
    const matcher = Object.create(
      Object.getPrototypeOf(baseMatcher),
      Object.getOwnPropertyDescriptors(optionalCaptureRegex)
    ) as Matcher
    
    // Set the props array so the rule knows to check context
    Object.defineProperty(matcher, 'props', { value: ['name'], writable: true, configurable: true })
    Object.defineProperty(matcher, 'spec', { value: '/:name?', writable: true, configurable: true })

    const rule = new Rule(matcher)
    rule.allow('read')

    // Path '/' matches the regex with match[1] === undefined
    // ctx = {} so ctx['name'] === undefined
    //
    // Original: prop===undefined => true => return false (no match) ✓
    // Mutated:  false || (undefined !== undefined) => false => return true (match!) ✗
    expect(rule.matches('/', {})).toBe(false)
    
    // Sanity: with correct context value, should match '/foo'
    expect(rule.matches('/foo', { name: 'foo' })).toBe(true)
  })
})