import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with array reduce behavior", () => {
  it("should correctly reduce promises array without initial basis by finding first element", async () => {
    // The mutation changes `if (arguments.length === 1)` to `if (false)` in array_reduce fallback
    // This affects behavior when array_reduce is used without an initial value
    // We test Q.any which uses array_reduce with undefined as initial value
    // and verify the promise chain works correctly
    
    const result = await Q.any([
      Q.reject(new Error("first rejection")),
      Q.resolve(42)
    ]);
    
    expect(result).toBe(42);
  });
});