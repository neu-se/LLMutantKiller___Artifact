import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nodeify method", () => {
  it("should return undefined when called without a nodeback in the mutated version", () => {
    const testValue = "test";
    const originalPromise = Q.resolve(testValue);
    const result = originalPromise.nodeify();
    expect(result).toBeUndefined();
  });
});