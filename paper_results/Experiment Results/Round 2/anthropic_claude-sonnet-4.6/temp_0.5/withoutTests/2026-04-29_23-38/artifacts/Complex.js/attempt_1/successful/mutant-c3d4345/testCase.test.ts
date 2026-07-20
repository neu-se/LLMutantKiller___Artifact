import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return finite result for non-zero real input, not Infinity", () => {
    // The mutation changes `if (a === 0 && b === 0)` to `if (true && b === 0)`
    // This means any complex number with b === 0 (pure real) will return Complex['INFINITY']
    // instead of only when both a and b are 0.
    // For a real number like 2 (a=2, b=0), the original code should compute acos(1/2)
    // but the mutated code would return Infinity.
    const result = new Complex(2, 0).asec();
    
    // The original result should be acos(1/2) = PI/3
    expect(result.isInfinite()).toBe(false);
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});