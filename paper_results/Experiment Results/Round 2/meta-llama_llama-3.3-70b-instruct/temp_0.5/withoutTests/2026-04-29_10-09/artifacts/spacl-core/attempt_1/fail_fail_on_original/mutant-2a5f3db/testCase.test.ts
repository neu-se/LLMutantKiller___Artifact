import { Policy } from "../../../../../../../../../../../subject_repositories/spacl-core/src/policy";
import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";

describe("Policy clone method", () => {
  it("should create a deep copy of the policy by default", () => {
    const rule1 = new Rule();
    const rule2 = new Rule();
    const policy = new Policy("test", rule1, rule2);
    const clonedPolicy = policy.clone("newName");
    expect(clonedPolicy.rules).not.toBe(policy.rules);
    expect(clonedPolicy.rules[0]).not.toBe(rule1);
    expect(clonedPolicy.rules[1]).not.toBe(rule2);
  });
});