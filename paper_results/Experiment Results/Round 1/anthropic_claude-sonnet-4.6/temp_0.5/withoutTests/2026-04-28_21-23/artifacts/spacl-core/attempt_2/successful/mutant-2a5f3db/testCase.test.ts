import { Policy } from "../../../../../../../../../../../subject_repositories/spacl-core/src/policy"
import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule"

describe('Policy.clone', () => {
  it('should perform a deep clone by default, resulting in different rule object references', () => {
    const rule = Rule.for('/test', 'GET')
    const policy = new Policy('test-policy', rule)
    
    const cloned = policy.clone()
    
    // Verify the clone has the same name
    expect(cloned.name).toBe('test-policy')
    
    // Verify the clone has the same number of rules
    expect(cloned.rules.length).toBe(1)
    
    // With deep=true (default), rules should be cloned (different object references)
    // With deep=false (mutation), rules would be the same object references
    expect(cloned.rules[0]).not.toBe(policy.rules[0])
  })
})