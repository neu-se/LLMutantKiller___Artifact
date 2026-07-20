import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should compute the hyperbolic secant of a complex number correctly", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    
    // sech(1 + i) should return a valid complex number
    // For a = 1, b = 1:
    // d = cos(2*1) + cosh(2*1) = cos(2) + cosh(2)
    // re = 2 * cosh(1) * cos(1) / d
    // im = -2 * sinh(1) * sin(1) / d
    
    const a = 1;
    const b = 1;
    const coshA = Math.cosh(a);
    const sinhA = Math.sinh(a);
    const cosB = Math.cos(b);
    const sinB = Math.sin(b);
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    
    const expectedRe = 2 * coshA * cosB / d;
    const expectedIm = -2 * sinhA * sinB / d;
    
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});