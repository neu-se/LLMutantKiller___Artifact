import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech", () => {
  it("should compute correct imaginary part for sech(1 + 2i)", () => {
    const c = new Complex(1, 2);
    const result = c.sech();
    
    const a = 1;
    const b = 2;
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    
    // With mutation b = undefined: sin(undefined) = NaN, result.im = NaN
    // With original b = 2: result.im = expectedIm (a specific finite value)
    expect(result.im).toBeCloseTo(expectedIm, 5);
    // expectedIm is non-zero, so this distinguishes from NaN case
    expect(result.im).not.toBeNaN();
    expect(Math.abs(result.im)).toBeGreaterThan(0.01);
  });
});