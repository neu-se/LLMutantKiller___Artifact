import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q basic", () => {
  it("resolves a simple promise", async () => {
    const result = await Q(42);
    expect(result).toBe(42);
  });
});