import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with multiple promises", () => {
  it("should resolve all promises and return correct values when using array_reduce internally", async () => {
    // The mutation removes the body of the for loop in array_reduce,
    // which means array_reduce never actually calls the callback.
    // Q.all uses array_reduce internally to process promises.
    // If array_reduce is broken, Q.all will never resolve pending promises.
    
    const result = await Q.all([
      Q.resolve(1),
      Q.resolve(2),
      Q.resolve(3)
    ]);
    
    expect(result).toEqual([1, 2, 3]);
  });
});