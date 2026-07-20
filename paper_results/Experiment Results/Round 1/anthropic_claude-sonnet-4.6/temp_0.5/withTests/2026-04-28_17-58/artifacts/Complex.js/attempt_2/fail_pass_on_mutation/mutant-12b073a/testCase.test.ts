import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex tan function", () => {
  it("should correctly compute tan for a purely imaginary number", () => {
    // tan(i) = sin(i)/cos(i) = i*sinh(1)/cosh(1) = i*tanh(1)
    // The sinh local function is used in tan's formula: sinh(b) / d
    // where b = 2*im and d = cos(2*re) + cosh(2*im)
    // For Complex(0, 1): a=0, b=2, d = cos(0) + cosh(2) = 1 + cosh(2)
    // im part = sinh(2) / (1 + cosh(2))
    // Original sinh(2) ≈ 3.6268..., mutant sinh(2) ≈ 7.2537...
    
    const c = new Complex(0, 1);
    const result = c.tan();
    
    // tanh(1) ≈ 0.7615941559557649
    const expected = Math.tanh(1);
    
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(expected, 10);
  });
});