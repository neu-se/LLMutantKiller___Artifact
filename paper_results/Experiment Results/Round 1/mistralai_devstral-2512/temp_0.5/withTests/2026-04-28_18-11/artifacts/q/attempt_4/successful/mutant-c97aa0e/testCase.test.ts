// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should return a promise when called on a promise instance", () => {
    const promise = Q.resolve([1, 2, 3]);
    const result = promise.any();
    expect(typeof result.then).toBe("function");
    expect(typeof result.catch).toBe("function");
  });
});