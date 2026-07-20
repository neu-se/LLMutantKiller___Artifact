import { Policy } from "../../../../../../../../../../../subject_repositories/spacl-core/src/policy";
import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";

describe('Policy clone behavior', () => {
  it('should create a deep clone by default', () => {
    const rule1 = new Rule('allow', '/path1', 'GET');
    const rule2 = new Rule('deny', '/path2', 'POST');
    const originalPolicy = new Policy('testPolicy', rule1, rule2);

    const clonedPolicy = originalPolicy.clone();

    // Verify that the cloned policy has the same name and rules
    expect(clonedPolicy.name).toBe(originalPolicy.name);
    expect(clonedPolicy.rules.length).toBe(originalPolicy.rules.length);

    // Verify that the rules are different objects (deep clone)
    expect(clonedPolicy.rules[0]).not.toBe(originalPolicy.rules[0]);
    expect(clonedPolicy.rules[1]).not.toBe(originalPolicy.rules[1]);

    // Verify that the rule properties are the same
    expect(clonedPolicy.rules[0].effect).toBe(originalPolicy.rules[0].effect);
    expect(clonedPolicy.rules[0].path).toBe(originalPolicy.rules[0].path);
    expect(clonedPolicy.rules[0].verbs).toBe(originalPolicy.rules[0].verbs);
  });
});