import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should return a promise that resolves with the first fulfilled value", async () => {
    const promise = Q.resolve(42);
    const result = await promise.any();
    expect(result).toBe(42);
  });
});