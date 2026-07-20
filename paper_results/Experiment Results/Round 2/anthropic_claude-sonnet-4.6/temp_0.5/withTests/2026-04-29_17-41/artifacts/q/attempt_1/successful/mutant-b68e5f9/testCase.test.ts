import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.nodeify", () => {
  it("should return the promise itself when called without a nodeback", () => {
    const promise = Q(10);
    const result = promise.nodeify();
    expect(result).toBe(promise);
  });
});