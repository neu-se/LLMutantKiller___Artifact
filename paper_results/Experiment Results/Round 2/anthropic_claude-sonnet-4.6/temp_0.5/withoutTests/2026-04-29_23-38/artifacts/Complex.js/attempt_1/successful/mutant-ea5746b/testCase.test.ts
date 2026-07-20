import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function via expm1", () => {
  it("should compute expm1 of a purely imaginary number accurately using correct Taylor series", () => {
    // cosm1(x) = cos(x) - 1, used in expm1
    // For Complex(0, x).expm1(), the real part should be cosm1(x) = cos(x) - 1
    // The mutation changes + 1/479001600 to - 1/479001600 in the Taylor series
    // This affects accuracy for x values within [-π/4, π/4]
    
    const x = 0.5; // Within [-π/4, π/4], large enough for the term to matter
    const c = new Complex(0, x);
    const result = c.expm1();
    
    // The real part should be cos(x) - 1
    const expected = Math.cos(x) - 1;
    
    // The difference between original and mutated is 2 * x^6 / 479001600
    // For x = 0.5: 2 * (0.5^6) / 479001600 ≈ 6.5e-11
    // This is well above EPSILON = 1e-15
    expect(Math.abs(result.re - expected)).toBeLessThan(1e-12);
  });
});