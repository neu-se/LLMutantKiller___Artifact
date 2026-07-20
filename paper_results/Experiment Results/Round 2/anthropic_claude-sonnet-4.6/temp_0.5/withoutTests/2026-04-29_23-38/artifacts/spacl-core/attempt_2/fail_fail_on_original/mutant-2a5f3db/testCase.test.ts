import { Policy } from "../../../../../../../../../../../subject_repositories/spacl-core/src/policy"
import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule"

describe('Policy.clone', () => {
  it('should perform a deep clone by default, resulting in different rule instances', () => {
    const rule = Rule.for('allow', '/test', ['GET'])
    const policy = new Policy('test-policy', rule)
    
    const cloned = policy.clone()
    
    // With deep=true (original default), rules should be cloned (different references)
    // With deep=false (mutated default), rules should be the same references
    expect(cloned.rules[0]).not.toBe(policy.rules[0])
  })
})