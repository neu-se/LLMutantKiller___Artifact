import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.nodeify", () => {
  it("should return the promise itself when no nodeback is provided", async () => {
    const promise = Q(42);
    const result = promise.nodeify(undefined);
    expect(result).toBe(promise);
  });
});