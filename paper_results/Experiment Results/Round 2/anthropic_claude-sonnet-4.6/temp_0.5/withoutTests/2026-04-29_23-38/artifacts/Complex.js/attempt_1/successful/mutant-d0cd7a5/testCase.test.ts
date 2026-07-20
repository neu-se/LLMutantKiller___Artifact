import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a complex number with non-zero imaginary part", () => {
    // acsch(c) = log((1+sqrt(1+c^2))/c)
    // For c = 1 + i, the real part of the intermediate computation uses a/d
    // and the imaginary part uses -b/d (original) vs +b/d (mutated)
    // where d = a^2 + b^2
    
    const c = new Complex(1, 1);
    const result = c.acsch();
    
    // The correct value of acsch(1+i) can be verified:
    // d = 1^2 + 1^2 = 2
    // a/d = 1/2, -b/d = -1/2 (original)
    // a/d = 1/2, +b/d = +1/2 (mutated - wrong sign)
    
    // With original code: new Complex(1/2, -1/2).asinh()
    // With mutated code: new Complex(1/2, +1/2).asinh()
    // These produce different results
    
    // Compute expected value using the correct formula:
    // acsch(1+i) using original: asinh(0.5 - 0.5i)
    const expected = new Complex(0.5, -0.5).asinh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});