import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.nodeify without nodeback", () => {
  it("should return the promise itself when no nodeback is provided", async () => {
    const promise = Q.resolve(42);
    const result = promise.nodeify(undefined);
    expect(result).toBe(promise);
  });
});