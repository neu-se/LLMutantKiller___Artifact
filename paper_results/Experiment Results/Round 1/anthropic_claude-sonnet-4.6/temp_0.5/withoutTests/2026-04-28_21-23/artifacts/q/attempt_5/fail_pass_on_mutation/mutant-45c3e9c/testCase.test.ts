import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array operations via uncurryThis", () => {
  it("should correctly resolve Q.all with multiple promises", async () => {
    // uncurryThis is used for array_slice, array_reduce, array_map etc.
    // With mutation (if false), these functions return undefined, breaking Q.all
    const result = await Q.all([Q.resolve(1), Q.resolve(2), Q.resolve(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});