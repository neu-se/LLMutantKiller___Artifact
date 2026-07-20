import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1 function", () => {
  it("should correctly compute expm1 for a purely imaginary number close to zero", () => {
    // expm1(i*b) = expm1(0 + i*b)
    // The real part uses cosm1(b) = cos(b) - 1
    // For small b, cosm1 uses the Taylor series polynomial
    // The mutation changes the polynomial evaluation from multiplication to division,
    // which produces a very different result for small angles
    
    const b = 0.1; // small angle within the Taylor series range (-π/4 to π/4)
    const c = new Complex(0, b);
    const result = c.expm1();
    
    // Expected: expm1(0)*cos(b) + cosm1(b) = 0 + (cos(b) - 1)
    // cos(0.1) - 1 ≈ -0.004995834721974977
    const expectedRe = Math.cos(b) - 1;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});