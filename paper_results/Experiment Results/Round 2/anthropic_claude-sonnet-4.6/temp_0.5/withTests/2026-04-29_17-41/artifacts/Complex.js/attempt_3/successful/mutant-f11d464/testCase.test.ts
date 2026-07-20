import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with fully imaginary base", () => {
  it("should return exactly zero real part for (0+i)^1", () => {
    const result = new Complex(0, 1).pow(1);
    // Original: special case, case 1 => new Complex(0, Math.pow(1,1)) = (0, 1) exact
    // Mutated: general formula gives re = cos(pi/2) ≈ 6.1e-17, not exactly 0
    expect(result.re).toBe(0);
    expect(result.im).toBeCloseTo(1, 10);
  });
});