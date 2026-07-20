import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.join", () => {
  it("should resolve with the value when two promises fulfill to the same value", async () => {
    const p1 = Q(42);
    const p2 = Q(42);
    const result = await p1.join(p2);
    expect(result).toBe(42);
  });
});