import { strictEqual } from 'assert'
import { describe, it } from '@jest/globals'
import { Policy, Rule } from '../src/policy'

describe('policy clone behavior', () => {
  it('should create deep clone by default', () => {
    const rule = Rule.for('/test').allow('read')
    const original = Policy.for('original', rule)
    const cloned = original.clone()

    // Modify the original rule
    rule.deny('read')

    // The cloned policy should have its own copy of rules
    strictEqual(cloned.query('/test', 'read'), true)
  })
})