import { Policy } from "../../../../../../../../../../../subject_repositories/spacl-core/src/policy";
import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";

describe('Policy clone behavior', () => {
  it('should perform deep clone by default', () => {
    const rule1 = new Rule('allow /path1 read');
    const rule2 = new Rule('deny /path2 write');
    const originalPolicy = new Policy('testPolicy', rule1, rule2);

    const clonedPolicy = originalPolicy.clone();

    // Verify cloned policy has different rule instances (deep clone)
    expect(clonedPolicy.rules[0]).not.toBe(originalPolicy.rules[0]);
    expect(clonedPolicy.rules[1]).not.toBe(originalPolicy.rules[1]);
    expect(clonedPolicy.rules.length).toBe(2);
    expect(clonedPolicy.name).toBe('testPolicy');
  });
});