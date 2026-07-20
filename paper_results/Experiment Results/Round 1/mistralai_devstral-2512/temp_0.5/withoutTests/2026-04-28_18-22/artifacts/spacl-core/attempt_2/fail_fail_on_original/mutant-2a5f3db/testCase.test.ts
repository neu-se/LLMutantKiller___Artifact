import { Policy } from "../../../../../../../../../../../subject_repositories/spacl-core/src/policy";
import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";

describe('Policy clone behavior', () => {
  it('should perform deep clone by default', () => {
    const rule1 = new Rule('allow /path1 read');
    const rule2 = new Rule('deny /path2 write');
    const originalPolicy = new Policy('testPolicy', rule1, rule2);

    const clonedPolicy = originalPolicy.clone();

    // Modify original policy's rules
    originalPolicy.push(new Rule('allow /path3 delete'));

    // Verify cloned policy is independent (deep clone)
    expect(clonedPolicy.rules.length).toBe(2);
    expect(originalPolicy.rules.length).toBe(3);
  });
});