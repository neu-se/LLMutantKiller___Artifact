import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.join", () => {
  it("should fulfill with the common value when two promises resolve to the same value", async () => {
    const value = { id: 42 };
    const p1 = Q(value);
    const p2 = Q(value);

    const result = await p1.join(p2);
    expect(result).toBe(value);
  });
});