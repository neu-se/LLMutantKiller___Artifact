import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sin with imaginary component", () => {
  it("sin(0 + 2i) real part should use sinh correctly", () => {
    // sin(bi) = i*sinh(b), so sin(2i) = i*sinh(2)
    // sin(a+bi) = sin(a)*cosh(b) + i*cos(a)*sinh(b)
    // sin(0+2i): re = sin(0)*cosh(2) = 0, im = cos(0)*sinh(2) = sinh(2) ≈ 3.6268
    // mutant: im = cos(0)*sinh_mutant(2) = (exp(2)-exp(-2))/0.5 ≈ 14.5074
    const c = new Complex(0, 2);
    const result = c.sin();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.sinh(2), 10);
  });
});