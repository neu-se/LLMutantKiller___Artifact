import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should correctly compute csc(z) for a complex number with non-trivial real and imaginary parts", () => {
    // csc(c) = 2i / (e^(ci) - e^(-ci))
    // The denominator uses: d = 0.5 * cosh(2*b) - 0.5 * cos(2*a)
    // Mutation changes cos(2*a) to cos(2/a), which gives different results when a != 1
    
    // Use a = 2, b = 1 so that 2*a = 4 and 2/a = 1, giving different cos values
    const z = new Complex(2, 1);
    const result = z.csc();
    
    // Compute expected value manually:
    // d = 0.5 * cosh(2*1) - 0.5 * cos(2*2)
    //   = 0.5 * cosh(2) - 0.5 * cos(4)
    const a = 2;
    const b = 1;
    const cosh2b = Math.cosh(2 * b);
    const cos2a = Math.cos(2 * a);
    const d = 0.5 * cosh2b - 0.5 * cos2a;
    
    const expectedRe = Math.sin(a) * Math.cosh(b) / d;
    const expectedIm = -Math.cos(a) * Math.sinh(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});