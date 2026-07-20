import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with fulfilled promises", () => {
  it("should correctly reduce promises array and resolve with all values", async () => {
    // This test exercises array_reduce which is used internally by Q.all
    // The mutation changes ++index to --index in the array_reduce fallback
    // We test with a scenario that would expose incorrect index traversal
    const result = await Q.all([
      Q.resolve(1),
      Q.resolve(2),
      Q.resolve(3),
    ]);
    
    expect(result).toEqual([1, 2, 3]);
  });
});