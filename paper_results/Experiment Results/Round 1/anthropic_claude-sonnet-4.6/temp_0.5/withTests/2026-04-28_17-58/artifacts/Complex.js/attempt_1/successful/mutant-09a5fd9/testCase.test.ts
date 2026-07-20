import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should compute sech correctly using cosh(a) not 1/cosh(a) in the real part", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // For c = a + bi:
    // Re(sech(c)) = 2 * cosh(a) * cos(b) / d  where d = cos(2b) + cosh(2a)
    // Mutant uses: 2 / cosh(a) * cos(b) / d
    
    // Use a = 2, b = 0 for simplicity
    // sech(2 + 0i) = 1/cosh(2) = 2/(e^2 + e^-2)
    // Re = 2 * cosh(2) * cos(0) / (cos(0) + cosh(4))
    //    = 2 * cosh(2) / (1 + cosh(4))
    // Mutant Re = 2 / cosh(2) * cos(0) / (1 + cosh(4))
    //           = 2 / (cosh(2) * (1 + cosh(4)))
    
    // The actual value of sech(2) should be 1/cosh(2) ≈ 0.2658...
    const c = new Complex(2, 0);
    const result = c.sech();
    
    const expected = 1 / Math.cosh(2);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});