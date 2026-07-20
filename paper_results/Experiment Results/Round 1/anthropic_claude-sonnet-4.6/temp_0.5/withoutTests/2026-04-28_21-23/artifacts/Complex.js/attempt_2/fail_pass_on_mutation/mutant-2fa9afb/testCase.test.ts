import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow function", () => {
  it("should correctly compute pow for non-zero base", () => {
    // (2 + 0i)^3 should be 8, not ZERO
    // The mutation changes `if (a === 0 && b === 0)` to `if (true)` in pow,
    // causing all pow operations to return ZERO when the general case is reached
    const c = new Complex(2, 1);
    const result = c.pow(new Complex(2, 0));
    
    // (2 + i)^2 = 4 + 4i + i^2 = 3 + 4i
    expect(result.re).toBeCloseTo(3, 10);
    expect(result.im).toBeCloseTo(4, 10);
  });
});