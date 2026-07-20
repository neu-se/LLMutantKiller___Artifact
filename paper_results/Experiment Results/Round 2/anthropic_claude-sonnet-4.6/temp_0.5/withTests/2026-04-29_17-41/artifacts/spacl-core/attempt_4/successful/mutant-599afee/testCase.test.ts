import { describe, it, expect } from '@jest/globals'
import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('rule', () => {
  it('does not match when context property is undefined and optional capture group is also undefined', () => {
    // Mutation: `prop === undefined` replaced with `false`
    // Original: if (prop === undefined || match[index + 1] !== prop) { return false }
    // Mutated:  if (false || match[index + 1] !== prop) { return false }
    //
    // When prop === undefined AND match[index + 1] === undefined:
    //   Original: true || false => true => return false (no match) ✓
    //   Mutated:  false || false => false => does NOT return false => returns true (match!) ✗
    //
    // We need a Matcher with an optional capture group so match[1] can be undefined.
    // Matcher extends RegExp - we subclass it to create one with optional capture.

    class OptionalCaptureMatcher extends Matcher {
      constructor () {
        // Call Matcher constructor with a valid spec first
        super('/:name')
        // We can't easily override the regex pattern after super() since RegExp is immutable
        // Instead, override [Symbol.match] to return our custom match result
      }

      [Symbol.match] (string: string): RegExpMatchArray | null {
        // Match '/' and return array with undefined capture
        if (string === '/') {
          const result = ['/'] as unknown as RegExpMatchArray
          result[1] = undefined as unknown as string
          result.index = 0
          result.input = string
          return result
        }
        // For other paths, use normal matching
        return string.match(/^\/([^/]+)$/)
      }
    }

    const matcher = new OptionalCaptureMatcher()
    // Ensure props is set correctly
    ;(matcher as any).props = ['name']

    const rule = new Rule(matcher)
    rule.allow('read')

    // Path '/' - our custom matcher returns match[1] = undefined
    // ctx = {} so ctx['name'] === undefined
    //
    // Original: prop===undefined => true => return false (no match) ✓
    // Mutated:  false || (undefined !== undefined) => false => return true (match!) ✗
    expect(rule.matches('/', {})).toBe(false)
  })
})