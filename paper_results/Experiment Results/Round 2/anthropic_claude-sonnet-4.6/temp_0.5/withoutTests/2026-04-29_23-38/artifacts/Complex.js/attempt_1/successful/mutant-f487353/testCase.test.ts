import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should return the correct imaginary part for csc of a complex number with non-zero imaginary component", () => {
    // csc(c) = 2i / (e^(ci) - e^(-ci))
    // For c = 1 + i:
    // a = 1, b = 1
    // d = 0.5 * cosh(2 * 1) - 0.5 * cos(2 * 1)
    // im = -Math.cos(a) * sinh(b) / d  (original)
    // im = +Math.cos(a) * sinh(b) / d  (mutated)
    
    const c = new Complex(1, 1);
    const result = c.csc();
    
    // The imaginary part should be negative (original) not positive (mutated)
    // For a=1, b=1: Math.cos(1) > 0, sinh(1) > 0, d > 0
    // So -Math.cos(1)*sinh(1)/d < 0 (original)
    // And +Math.cos(1)*sinh(1)/d > 0 (mutated)
    
    const a = 1;
    const b = 1;
    const cosh2b = Math.cosh(2 * b);
    const cos2a = Math.cos(2 * a);
    const d = 0.5 * cosh2b - 0.5 * cos2a;
    const sinh_b = Math.sinh(b);
    const expectedIm = -Math.cos(a) * sinh_b / d;
    
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});