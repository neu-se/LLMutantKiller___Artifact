import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute sech(1 + i) with multiplication not division by cos(b)", () => {
    // sech(a + bi) uses formula: re = 2 * cosh(a) * cos(b) / d
    // where d = cos(2b) - cosh(2a)
    // mutant uses: re = 2 * cosh(a) / cos(b) / d
    // These differ when cos(b) != 1
    
    const a = 1;
    const b = 1;
    const c = new Complex(a, b);
    const result = c.sech();
    
    const coshA = Math.cosh(a);
    const cosB = Math.cos(b);
    const sinhA = Math.sinh(a);
    const sinB = Math.sin(b);
    const d = Math.cos(2 * b) - Math.cosh(2 * a);
    
    // Original formula: 2 * cosh(a) * cos(b) / d
    const expectedRe = 2 * coshA * cosB / d;
    const expectedIm = -2 * sinhA * sinB / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});