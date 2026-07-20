import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should compute acoth with correct imaginary sign for complex input", () => {
    // acoth(c) = log((c+1) / (c-1)) / 2
    // For c = 2 + i, the imaginary part of the result should have a specific sign
    // The mutation changes -b/d to +b/d in the atanh call within acoth
    const c = new Complex(2, 1);
    const result = c.acoth();
    
    // Expected: acoth(2+i) computed correctly
    // The imaginary part of the intermediate atanh argument should use -b/d not +b/d
    // For a=2, b=1: d = 4+1 = 5, so atanh(2/5, -1/5) vs atanh(2/5, +1/5)
    // These give different results
    
    // Compute expected value manually: acoth(z) = atanh(1/z)
    // 1/(2+i) = (2-i)/(4+1) = (2/5) - (1/5)i
    const expected = new Complex(2, 1).inverse().atanh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});