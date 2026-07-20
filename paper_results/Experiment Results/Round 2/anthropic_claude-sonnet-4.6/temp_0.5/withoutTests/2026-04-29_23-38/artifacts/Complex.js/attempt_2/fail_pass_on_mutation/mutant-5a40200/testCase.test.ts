import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh computation", () => {
  it("should return correct cosh value for complex number with nonzero imaginary part", () => {
    // cosh(0 + i*pi) = cos(pi) = -1
    // cosh(a + ib) = cosh(a)*cos(b) + i*sinh(a)*sin(b)
    // For z = 1 + 0i: cosh(1) should be (e + 1/e)/2 ≈ 1.5430806348152437
    // The internal cosh function is used: if mutated, cosh(2) = 1-2 = -1 instead of ~3.762
    // tanh uses cosh(2a) in denominator
    const z = new Complex(1, 0);
    const result = z.tanh();
    // tanh(1) = sinh(2)/(cosh(2) + cos(0)) = sinh(2)/(cosh(2)+1)
    // Original: cosh(2) ≈ 3.7622, result ≈ 0.7616
    // Mutated: cosh(2) = 1-2 = -1, denominator = -1+1 = 0, result = Infinity
    expect(isFinite(result.re)).toBe(true);
    expect(result.re).toBeCloseTo(Math.tanh(1), 10);
  });
});