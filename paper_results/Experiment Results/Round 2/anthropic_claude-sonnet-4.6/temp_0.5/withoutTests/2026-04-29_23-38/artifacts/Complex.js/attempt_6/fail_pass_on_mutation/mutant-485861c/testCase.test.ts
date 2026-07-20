import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parse behavior", () => {
  it("should correctly handle the parse function returning object without spurious empty-string key affecting re", () => {
    // Test that re is 0 when null is passed (not affected by empty string property)
    const c = new Complex(null);
    // The original sets z[""] via chain, mutated sets z[""] directly
    // Both result in same im/re values
    // Try testing via valueOf
    expect(c.valueOf()).toBe(0);
  });
});