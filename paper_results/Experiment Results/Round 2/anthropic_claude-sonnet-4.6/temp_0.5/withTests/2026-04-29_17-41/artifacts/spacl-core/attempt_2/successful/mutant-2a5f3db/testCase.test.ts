import { describe, it, expect } from '@jest/globals'
import { Policy, Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src'

describe('Policy clone default deep parameter', () => {
  it('should perform a deep clone by default (deep=true)', () => {
    const rule = Rule.for('/test').allow('read')
    const original = Policy.for('original', rule)

    // Clone without specifying the deep parameter - should default to true (deep clone)
    const cloned = original.clone()

    // Modify the original rule after cloning by adding a deny
    rule.deny('read')

    // With deep=true (original behavior), the cloned policy should have its own copy of the rule
    // so the deny added to the original rule should NOT affect the cloned policy
    // Expected: true (allow is still in effect in the deep-cloned rule)
    const result = cloned.query('/test', 'read')
    expect(result).toBe(true)
  })
})