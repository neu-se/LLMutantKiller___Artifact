import { Policy } from "../../../../../../../../../../../subject_repositories/spacl-core/src/policy";
import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";

describe('Policy clone behavior', () => {
  it('should create a deep clone by default', () => {
    // Create rules with properly formatted specifications
    const rule1 = new Rule('allow /path1 GET');
    const rule2 = new Rule('deny /path2 POST');
    const originalPolicy = new Policy('testPolicy', rule1, rule2);

    const clonedPolicy = originalPolicy.clone();

    // Verify that modifying the original policy's rules doesn't affect the clone
    originalPolicy.push(new Rule('allow /path3 PUT'));

    expect(originalPolicy.rules.length).toBe(3);
    expect(clonedPolicy.rules.length).toBe(2);

    // Verify that the clone's rules are still different objects (deep clone)
    expect(clonedPolicy.rules[0]).not.toBe(originalPolicy.rules[0]);
    expect(clonedPolicy.rules[1]).not.toBe(originalPolicy.rules[1]);
  });
});