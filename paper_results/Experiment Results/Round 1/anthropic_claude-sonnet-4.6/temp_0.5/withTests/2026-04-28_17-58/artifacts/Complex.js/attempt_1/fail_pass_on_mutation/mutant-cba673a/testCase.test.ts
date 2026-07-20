import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh function", () => {
  it("should correctly compute cosh-dependent operations like tanh", () => {
    // tanh uses cosh internally: tanh(a) = sinh(a) / (cosh(a) + cos(b))
    // For a real number z = 1 + 0i:
    // tanh(1) = sinh(2) / (cosh(2) + cos(0)) = sinh(2) / (cosh(2) + 1)
    // With the mutated cosh returning undefined, the result would be NaN or wrong
    const z = new Complex(1, 0);
    const result = z.tanh();
    
    // tanh(1) ≈ 0.7615941559557649
    const expected = Math.tanh(1);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});