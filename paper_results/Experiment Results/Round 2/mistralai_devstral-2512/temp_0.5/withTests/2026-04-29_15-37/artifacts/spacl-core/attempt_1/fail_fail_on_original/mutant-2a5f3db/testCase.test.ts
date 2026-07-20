import { strictEqual } from 'assert'
import { describe, it } from '@jest/globals'
import { Policy, Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/policy'

describe('policy clone behavior', () => {
  it('should perform deep clone by default', () => {
    const rule = Rule.for('/test').allow('foo')
    const original = Policy.for('original', rule)
    const cloned = original.clone()

    // Modify the original rule
    rule.deny('foo')

    // The cloned policy should have its own copy of the rule
    // and not be affected by changes to the original rule
    strictEqual(cloned.query('/test', 'foo'), true)
  })
})