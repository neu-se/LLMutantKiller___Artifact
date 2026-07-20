import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division by infinite number", () => {
  it("should return ZERO when dividing a finite non-zero complex number by infinity", () => {
    const finite = new Complex(3, 4);
    const infinite = Complex.INFINITY;
    const result = finite.div(infinite);
    
    // In original code: hits the `if (this.isZero() || z.isInfinite())` branch and returns ZERO
    // In mutated code: that branch is `if (false)`, so it falls through to actual division
    // which would produce NaN or incorrect results
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(result.isZero()).toBe(true);
  });
});