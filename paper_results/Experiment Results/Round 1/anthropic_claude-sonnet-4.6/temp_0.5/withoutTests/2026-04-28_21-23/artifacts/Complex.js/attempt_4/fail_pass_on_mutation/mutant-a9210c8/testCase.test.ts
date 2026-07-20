import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should compute sech with correct imaginary component when im is non-zero", () => {
    // For z = 1 + 2i, verify im part is specifically what formula gives
    const z = new Complex(1, 2);
    const a = 1;
    const b = 2;
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    
    const result = z.sech();
    
    // With mutation b=undefined: expectedIm would be NaN or 0 (sin(undefined)=NaN)
    // With original: expectedIm is a specific non-zero value
    expect(result.im).not.toBe(0);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});