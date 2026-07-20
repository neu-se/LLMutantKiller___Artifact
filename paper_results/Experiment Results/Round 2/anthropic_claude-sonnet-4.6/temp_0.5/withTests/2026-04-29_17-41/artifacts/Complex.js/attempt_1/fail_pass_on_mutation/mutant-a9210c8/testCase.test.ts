import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute sech of a complex number with imaginary part", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // For c = 1 + 2i:
    // sech(1+2i) should have a non-trivial imaginary part that depends on b = this['im']
    // The mutation changes `var b = this['im']` to `var b = this[""]` (undefined)
    // which would make sinh(a) * Math.sin(b) use NaN instead of the actual imaginary part
    
    const c = new Complex(1, 2);
    const result = c.sech();
    
    // With the original code, b = this['im'] = 2
    // d = Math.cos(2*2) + cosh(2*1) = Math.cos(4) + cosh(2)
    const a = 1;
    const b = 2;
    const coshFn = Math.cosh;
    const sinhFn = Math.sinh;
    const d = Math.cos(2 * b) + coshFn(2 * a);
    const expectedRe = 2 * coshFn(a) * Math.cos(b) / d;
    const expectedIm = -2 * sinhFn(a) * Math.sin(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
    
    // Ensure the imaginary part is not NaN (which would happen with the mutation)
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});