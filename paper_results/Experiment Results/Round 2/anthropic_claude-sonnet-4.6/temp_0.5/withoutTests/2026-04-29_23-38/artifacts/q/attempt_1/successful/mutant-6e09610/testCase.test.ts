import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.thenResolve", () => {
  it("should resolve with the provided value, not undefined", async () => {
    const result = await Q(42).thenResolve("expected value");
    expect(result).toBe("expected value");
  });
});