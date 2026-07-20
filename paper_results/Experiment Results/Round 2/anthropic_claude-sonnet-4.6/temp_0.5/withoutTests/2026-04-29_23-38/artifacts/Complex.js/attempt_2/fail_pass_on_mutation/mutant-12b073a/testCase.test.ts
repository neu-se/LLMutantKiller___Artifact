import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex tan function", () => {
  it("should correctly compute tan(1+i) using sinh internally", () => {
    // tan(z) uses sinh(2b) / (cos(2a) + cosh(2b))
    // For z = 0 + 1i: a=0, b=1
    // tan(i) = i * tanh(1)
    // The real part should be 0, imaginary part should be tanh(1) ≈ 0.7615941559557649
    // With mutant, sinh(2) is 4x larger, so the result will differ significantly
    const c = new Complex(0, 1);
    const result = c.tan();
    const expectedIm = Math.tanh(1); // ~0.7615941559557649
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});