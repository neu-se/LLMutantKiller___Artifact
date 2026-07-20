import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs mutation detection", () => {
  it("detects mutation in hypot large-value branch using extremely large values", () => {
    // Use values so large they definitely bypass the small-value early return
    // and trigger the a < b branch where the mutation matters
    const c = new Complex(3e15, 4e15);
    const result = c.abs();
    expect(result).toBeCloseTo(5e15, 5);
  });
});