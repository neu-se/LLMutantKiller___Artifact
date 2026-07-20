import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isFulfilled", () => {
  it("returns true for non-promise values", () => {
    // With the original code: !isPromise(undefined) || ... => true || ... => true
    // With the mutated code: !isPromise(undefined) && undefined.inspect()... => throws TypeError
    expect(Q.isFulfilled(undefined)).toBe(true);
    expect(Q.isFulfilled(null)).toBe(true);
    expect(Q.isFulfilled(42)).toBe(true);
    expect(Q.isFulfilled("hello")).toBe(true);
    expect(Q.isFulfilled({})).toBe(true);
  });
});