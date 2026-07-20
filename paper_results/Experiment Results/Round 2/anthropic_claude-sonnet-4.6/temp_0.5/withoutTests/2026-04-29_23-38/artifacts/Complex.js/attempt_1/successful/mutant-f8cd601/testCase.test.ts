import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch function", () => {
  it("should calculate the complex hyperbolic cosecant correctly", () => {
    // csch(1 + i) should return a valid complex number with specific re and im parts
    const z = new Complex(1, 1);
    const result = z.csch();
    
    // The result should not be undefined
    expect(result).toBeDefined();
    
    // The result should have re and im properties
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
    
    // For csch(1 + i), we can compute expected values:
    // csch(c) = 2 / (e^c - e^-c)
    // Using the formula: re = -2*sinh(a)*cos(b)/d, im = 2*cosh(a)*sin(b)/d
    // where d = cos(2b) - cosh(2a)
    const a = 1;
    const b = 1;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);
    const expectedRe = -2 * Math.sinh(a) * Math.cos(b) / d;
    const expectedIm = 2 * Math.cosh(a) * Math.sin(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});