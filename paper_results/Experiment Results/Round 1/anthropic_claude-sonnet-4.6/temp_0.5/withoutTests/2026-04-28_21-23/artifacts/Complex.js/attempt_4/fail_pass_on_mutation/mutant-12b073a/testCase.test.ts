import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch method", () => {
  it("should return correct csch value for real input", () => {
    // csch(1) = 1/sinh(1) ≈ 0.8509181282...
    // csch uses: -2 * sinh(a) * cos(b) / d  where d = cos(2b) - cosh(2a)
    // For z=1 (real, b=0):
    //   d = cos(0) - cosh(2) = 1 - cosh(2) ≈ 1 - 3.7622 = -2.7622
    //   re = -2 * sinh(1) * 1 / d = -2 * sinh(1) / (1 - cosh(2))
    // original sinh(1) ≈ 1.1752, mutated sinh(1) ≈ 4.7010
    // original result re ≈ 0.8509, mutated result re ≈ 3.4036
    const c = new Complex(1, 0);
    const result = c.csch();
    
    expect(result.re).toBeCloseTo(0.8509181282393216, 5);
    expect(result.im).toBeCloseTo(0, 10);
  });
});