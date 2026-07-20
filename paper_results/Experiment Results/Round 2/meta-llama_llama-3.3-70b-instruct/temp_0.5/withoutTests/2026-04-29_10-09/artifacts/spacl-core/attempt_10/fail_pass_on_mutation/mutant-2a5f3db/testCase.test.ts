import { Policy } from "../../../../../../../../../../../subject_repositories/spacl-core/src/policy";
import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";

describe("Policy clone method", () => {
  it("should create a deep copy of the policy by default", () => {
    const rule = new Rule("/");
    const policy = new Policy("test", rule);
    const clonedPolicy = policy.clone("newName");
    clonedPolicy.rules[0] = new Rule("/newPath");
    expect(policy.rules[0]).not.toBe(clonedPolicy.rules[0]);
  });
});