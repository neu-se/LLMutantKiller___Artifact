import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex div - zero numerator or infinite denominator", () => {
  it("should return ZERO when dividing zero by a finite non-zero complex number", () => {
    // In the original code, the condition `if (this['isZero']() || z['isInfinite']())` returns Complex.ZERO
    // In the mutated code, `if (false)` skips this check, causing incorrect behavior
    const zero = new Complex(0, 0);
    const divisor = new Complex(3, 4);
    const result = zero.div(divisor);
    
    // The result should be zero (0 + 0i)
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(result.isZero()).toBe(true);
  });
});