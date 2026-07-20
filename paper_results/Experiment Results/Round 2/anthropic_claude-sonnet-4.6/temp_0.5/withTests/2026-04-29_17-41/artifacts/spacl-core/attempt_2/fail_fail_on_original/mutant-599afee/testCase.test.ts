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
    // We need an optional capture group so match[1] can be undefined.
    // Regex: /^\/(?:([^/]+))?$/ matches '/' with match[1]=undefined, or '/foo' with match[1]='foo'
    // Props: ['name'] so ctx['name'] is compared to match[1]

    // Create a Matcher-like object with an optional capture group
    const baseRegex = /^\/(?:([^/]+))?$/
    const matcher = Object.assign(
      new RegExp(baseRegex.source, baseRegex.flags),
      { props: ['name'], spec: '/(:name)?' }
    ) as unknown as Matcher

    const rule = new Rule(matcher)
    rule.allow('read')

    // Path '/' matches the regex with match[1] === undefined
    // ctx = {} so ctx['name'] === undefined
    //
    // Original: prop===undefined => true => return false (no match)
    // Mutated:  false || (undefined !== undefined) => false => return true (match!) -- BUG
    expect(rule.matches('/', {})).toBe(false)
  })
})