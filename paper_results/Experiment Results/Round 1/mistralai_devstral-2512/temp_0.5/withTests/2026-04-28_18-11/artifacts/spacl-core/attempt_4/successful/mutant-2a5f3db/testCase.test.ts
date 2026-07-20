import { strictEqual } from 'assert'
import { describe, it } from '@jest/globals'
import { Policy } from '../../../../../../../../../../../subject_repositories/spacl-core/src/policy'
import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule'

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