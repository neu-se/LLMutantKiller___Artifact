import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should compute acoth correctly for a complex number with non-zero imaginary part", () => {
    // acoth(c) = log((c+1) / (c-1)) / 2
    // For c = 2 + i, the imaginary part of the result should be negative
    // The mutation changes -b/d to +b/d in the atanh call within acoth
    // This affects the imaginary component passed to atanh
    
    const c = new Complex(2, 1);
    const result = c.acoth();
    
    // Expected: acoth(2+i) computed correctly
    // We can verify by checking that acoth(z) * tanh gives back z
    // i.e., tanh(acoth(z)) should equal z (approximately)
    const check = result.tanh();
    
    expect(check.re).toBeCloseTo(c.re, 10);
    expect(check.im).toBeCloseTo(c.im, 10);
  });
});