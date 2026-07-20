import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch function", () => {
  it("should correctly compute csch for a complex number with non-zero real part", () => {
    // csch(a + bi) uses d = Math.cos(2*b) - cosh(2*a)
    // The mutation changes cosh(2*a) to cosh(2/a), which gives different results when a != 1
    const z = new Complex(2, 1);
    const result = z.csch();
    
    // Manually compute expected value:
    // csch(2 + i) = -2*sinh(2)*cos(1)/d + i*2*cosh(2)*sin(1)/d
    // where d = cos(2*1) - cosh(2*2) = cos(2) - cosh(4)
    const a = 2;
    const b = 1;
    const coshFn = (x: number) => (Math.exp(x) + Math.exp(-x)) / 2;
    const sinhFn = (x: number) => (Math.exp(x) - Math.exp(-x)) / 2;
    
    const d = Math.cos(2 * b) - coshFn(2 * a);
    const expectedRe = -2 * sinhFn(a) * Math.cos(b) / d;
    const expectedIm = 2 * coshFn(a) * Math.sin(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});