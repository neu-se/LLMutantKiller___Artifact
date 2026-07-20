import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth for a complex number with non-zero real and imaginary parts", () => {
    // acoth(c) = log((c+1) / (c-1)) / 2
    // For c = 2 + i, we test that acoth returns the correct value
    // The mutation changes a/d to a*d in the computation, which will give wrong results
    // when d != 1 (i.e., when a^2 + b^2 != 1)
    
    const c = new Complex(2, 1);
    const result = c.acoth();
    
    // Expected: acoth(2+i) = atanh(1/(2+i)) = atanh((2-i)/5) = atanh(0.4 - 0.2i)
    // Let's compute the expected value manually:
    // acoth(z) = atanh(1/z)
    // 1/(2+i) = (2-i)/(4+1) = (2-i)/5 = 0.4 - 0.2i
    // atanh(0.4 - 0.2i) can be computed
    
    const expected = new Complex(1, 0).div(new Complex(2, 1)).atanh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});