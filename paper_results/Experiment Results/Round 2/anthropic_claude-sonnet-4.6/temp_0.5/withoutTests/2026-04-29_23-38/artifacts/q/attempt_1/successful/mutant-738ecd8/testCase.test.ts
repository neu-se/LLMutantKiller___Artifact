import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.join", () => {
  it("should resolve with the common value when both promises fulfill to the same value", async () => {
    const result = await Q(42).join(Q(42));
    expect(result).toBe(42);
  });
});