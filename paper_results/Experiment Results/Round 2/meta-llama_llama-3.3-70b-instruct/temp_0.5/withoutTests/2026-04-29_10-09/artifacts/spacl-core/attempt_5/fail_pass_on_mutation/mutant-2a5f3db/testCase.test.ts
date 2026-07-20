import { Policy } from "../../../../../../../../../../../subject_repositories/spacl-core/src/policy";
import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";

describe("Policy clone method", () => {
  it("should create a deep copy of the policy by default", () => {
    const rule = new Rule("/", '1');
    const policy = new Policy("test", rule);
    const clonedPolicyDeep = policy.clone("newName", true);
    const clonedPolicyShallow = policy.clone("newName", false);
    expect(clonedPolicyDeep.rules[0]).not.toBe(policy.rules[0]);
    expect(clonedPolicyShallow.rules[0]).toBe(policy.rules[0]);
  });
});