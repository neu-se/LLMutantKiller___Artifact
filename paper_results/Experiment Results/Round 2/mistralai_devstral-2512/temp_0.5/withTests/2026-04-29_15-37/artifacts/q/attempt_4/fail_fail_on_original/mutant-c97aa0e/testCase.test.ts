import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should have any method that returns a promise", () => {
    const promise = Q.resolve(10);
    const result = promise.any();
    expect(result).toBeInstanceOf(Q);
  });
});