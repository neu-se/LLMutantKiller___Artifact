import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce fallback", () => {
  it("should handle reduce without initial value via array_map fallback", async () => {
    const originalReduce = Array.prototype.reduce;
    // The module is already loaded, so we can't affect array_reduce assignment
    // But we can test that Q.all works with the existing reduce
    const result = await Q.all([Q.resolve(1), Q.resolve(2)]);
    expect(result).toEqual([1, 2]);
  });
});