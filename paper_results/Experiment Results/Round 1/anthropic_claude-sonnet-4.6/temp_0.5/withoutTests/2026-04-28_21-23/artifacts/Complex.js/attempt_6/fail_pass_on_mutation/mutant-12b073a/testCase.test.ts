import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex tanh method", () => {
  it("should return correct tanh value for real input z=1", () => {
    // tanh uses sinh(2a) / (cosh(2a) + cos(2b))
    // For z=1 (real): a=2, b=0
    // original: sinh(2) ≈ 3.6268, result ≈ tanh(2) ≈ 0.9640
    // mutated (no Math.sinh ||, uses /0.5): sinh(2) ≈ 14.5074, result differs
    const c = new Complex(1, 0);
    const result = c.tanh();
    
    const expected = Math.tanh(1);
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});