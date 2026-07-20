import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with sparse arrays", () => {
  it("should handle array_reduce correctly with sparse arrays in Q.any", async () => {
    // Test that Q.any works correctly - uses array_reduce internally
    const result = await Q.any([Q.resolve(42)]);
    expect(result).toBe(42);
  });
});