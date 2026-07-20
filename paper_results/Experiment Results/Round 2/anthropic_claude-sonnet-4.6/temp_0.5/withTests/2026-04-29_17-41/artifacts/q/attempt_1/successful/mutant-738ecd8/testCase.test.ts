import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.join", () => {
  it("should fulfill with the common value when both promises resolve to the same value", async () => {
    const result = await Q(42).join(Q(42));
    expect(result).toBe(42);
  });
});