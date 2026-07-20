import { describe, it, expect } from '@jest/globals'
import { Policy, Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/policy'

describe('Policy.clone default deep parameter', () => {
  it('should perform a deep clone by default (deep=true), so mutations to original rules do not affect the clone', () => {
    const rule = Rule.for('/test').allow('foo', 'bar')
    const original = Policy.for('original', rule)

    // Clone without specifying the deep parameter - should default to deep=true
    const cloned = original.clone()

    // Now mutate the original rule by adding deny verbs
    rule.deny('foo', 'bar')

    // With deep=true (original behavior), the cloned policy should have its own copy of the rule
    // so it should still allow 'foo' and 'bar'
    expect(cloned.query('/test', 'foo')).toBe(true)
    expect(cloned.query('/test', 'bar')).toBe(true)

    // With deep=false (mutated behavior), the cloned policy shares the same rule objects
    // so it would return false (deny) for 'foo' and 'bar'
  })
})