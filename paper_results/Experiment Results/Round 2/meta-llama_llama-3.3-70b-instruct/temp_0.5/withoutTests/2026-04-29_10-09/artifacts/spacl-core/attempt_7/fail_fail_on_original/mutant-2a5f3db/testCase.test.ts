import { Policy } from "../../../../../../../../../../../subject_repositories/spacl-core/src/policy";
import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";

describe("Policy clone method", () => {
  it("should create a deep copy of the policy by default when deep is true", () => {
    const rule = new Rule("/", '1');
    const policy = new Policy("test", rule);
    const clonedPolicyDeep = policy.clone("newName", true);
    clonedPolicyDeep.rules[0] = new Rule("/newPath", '1');
    expect(policy.rules[0]).not.toBe(clonedPolicyDeep.rules[0]);
    const clonedPolicyShallow = policy.clone("newName", false);
    clonedPolicyShallow.rules[0] = new Rule("/newPath", '1');
    expect(policy.rules[0]).toBe(clonedPolicyShallow.rules[0]);
  });
});