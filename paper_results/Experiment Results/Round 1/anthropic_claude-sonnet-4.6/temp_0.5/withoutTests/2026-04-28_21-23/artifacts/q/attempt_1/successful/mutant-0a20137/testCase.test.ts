import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
  it("should return a promise that resolves to the common value when both promises resolve to the same value", async () => {
    const result = await Q.join(Q(42), Q(42));
    expect(result).toBe(42);
  });
});