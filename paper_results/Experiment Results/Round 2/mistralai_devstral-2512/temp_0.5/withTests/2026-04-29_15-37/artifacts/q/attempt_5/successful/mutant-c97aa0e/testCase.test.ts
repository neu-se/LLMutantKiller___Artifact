import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should return a promise when called on a promise instance", () => {
    const promise = Q.resolve(10);
    const result = promise.any();
    expect(result).toBeDefined();
    expect(typeof result.then).toBe("function");
  });
});