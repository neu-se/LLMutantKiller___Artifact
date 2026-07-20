import { Policy } from "../../../../../../../../../../../subject_repositories/spacl-core/src/policy";
import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";

describe('Policy clone behavior', () => {
  it('should create a deep clone by default', () => {
    const rule1 = new Rule('allow /path1 GET');
    const rule2 = new Rule('deny /path2 POST');
    const originalPolicy = new Policy('testPolicy', rule1, rule2);

    const clonedPolicy = originalPolicy.clone();

    // Verify that the cloned policy has the same name
    expect(clonedPolicy.name).toBe(originalPolicy.name);

    // Verify that the rules are different objects (deep clone)
    expect(clonedPolicy.rules[0]).not.toBe(originalPolicy.rules[0]);
    expect(clonedPolicy.rules[1]).not.toBe(originalPolicy.rules[1]);

    // Verify that the rules have the same behavior
    expect(clonedPolicy.rules[0].query('/path1', 'GET')).toBe(true);
    expect(originalPolicy.rules[0].query('/path1', 'GET')).toBe(true);
  });
});