import { Policy } from "../../../../../../../../../../../subject_repositories/spacl-core/src/policy";
import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";

describe('Policy', () => {
  it('should clone policy with deep copy by default', () => {
    // Create a rule
    const rule = new Rule();

    // Create a policy with the rule
    const policy = new Policy('test-policy', rule);

    // Clone the policy
    const clonedPolicy = policy.clone();

    // Modify the original rule
    rule.clone();

    // Check if the cloned policy has a different rule instance
    expect(clonedPolicy.rules[0]).not.toBe(rule);
  });
});