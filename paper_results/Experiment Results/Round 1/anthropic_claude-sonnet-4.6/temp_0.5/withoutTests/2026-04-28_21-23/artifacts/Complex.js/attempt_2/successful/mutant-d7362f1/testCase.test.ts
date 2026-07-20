import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul optimized real path", () => {
  it("should return positive zero imaginary part when multiplying two real numbers with negative zero real parts", () => {
    // Original code takes optimized path: new Complex(this.re * z.re, 0)
    // Mutated code takes general path: im = this.re * z.im + this.im * z.re = (-0)*0 + 0*(-0) = -0
    const a = new Complex(-0, 0);
    const b = new Complex(-0, 0);
    const result = a.mul(b);
    
    // In original: im = 0 (explicit positive zero from optimized path)
    // In mutated: im = (-0)*0 + 0*(-0) = -0 (negative zero from general formula)
    // Object.is distinguishes +0 from -0
    expect(Object.is(result['im'], 0)).toBe(true);
    expect(Object.is(result['im'], -0)).toBe(false);
  });
});