// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should be chainable and return a promise", () => {
    const promise = Q.resolve(42);
    const result = promise.any();
    expect(result).toBeInstanceOf(Q);
    expect(result.then).toBeInstanceOf(Function);
  });
});