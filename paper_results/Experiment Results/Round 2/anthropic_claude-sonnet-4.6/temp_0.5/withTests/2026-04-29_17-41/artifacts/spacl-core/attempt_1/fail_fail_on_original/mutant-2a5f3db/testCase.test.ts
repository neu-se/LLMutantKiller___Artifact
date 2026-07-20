import { describe, it, expect } from '@jest/globals'
import { Policy, Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/policy'

describe('Policy clone default deep parameter', () => {
  it('should perform a deep clone by default (deep=true)', () => {
    const rule = Rule.for('/test').allow('read')
    const original = Policy.for('original', rule)

    // Clone without specifying the deep parameter - should default to true (deep clone)
    const cloned = original.clone()

    // Modify the original rule after cloning
    rule.deny('read')

    // With deep=true (original behavior), the cloned policy should have its own copy of the rule
    // so the deny added to the original rule should NOT affect the cloned policy
    const deepCloneResult = cloned.query('/test', 'read')
    expect(deepCloneResult).toBe(true)

    // With deep=false (mutated behavior), the cloned policy shares the same rule objects
    // so the deny added to the original rule WOULD affect the cloned policy (returning false)
  })
})