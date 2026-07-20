import { Policy } from "../../../../../../../../../../../subject_repositories/spacl-core/src/policy.ts"
import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule.ts"

describe('Policy.clone', () => {
  it('should perform a deep clone by default', () => {
    const rule = new Rule('allow', '/test', 'GET')
    const policy = new Policy('test-policy', rule)
    
    const cloned = policy.clone()
    
    // With deep=true (original), rules should be cloned (different references)
    // With deep=false (mutated), rules should be the same references
    expect(cloned.rules[0]).not.toBe(policy.rules[0])
  })
})