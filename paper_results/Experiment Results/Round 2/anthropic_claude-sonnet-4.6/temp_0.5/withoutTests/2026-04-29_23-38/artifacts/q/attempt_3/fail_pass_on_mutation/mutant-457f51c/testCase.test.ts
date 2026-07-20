import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isFulfilled behavior", () => {
  it("isFulfilled returns true for non-promise values", () => {
    expect(Q.isFulfilled(42)).toBe(true);
    expect(Q.isFulfilled("hello")).toBe(true);
    expect(Q.isFulfilled(null)).toBe(true);
    expect(Q.isFulfilled(undefined)).toBe(true);
  });
});