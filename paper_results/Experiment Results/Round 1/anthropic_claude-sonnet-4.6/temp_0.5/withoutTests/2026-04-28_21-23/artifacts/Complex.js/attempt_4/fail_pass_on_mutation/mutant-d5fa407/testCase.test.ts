import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot result should have correct imaginary sign for negative imaginary input", () => {
    // Use a case where b != 0 but the early return (b===0) is not taken
    // and d = a^2 + b^2 could be 0 due to subnormal numbers
    // Try with -0 for b to see if sign matters
    const c = new Complex(0, -0);
    // b = -0, b === 0 is true in JS, so early return taken
    // acot(0) = atan2(1, 0) = pi/2
    const result = c.acot();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(0);
  });
});