import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should correctly compute asec for a complex number with non-zero imaginary part", () => {
    // asec(c) uses d = a*a + b*b internally
    // With mutation d = a*a - b*b, the result will differ when b != 0
    // Test with c = 1 + i (a=1, b=1)
    // Original: d = 1*1 + 1*1 = 2
    // Mutated:  d = 1*1 - 1*1 = 0 (which leads to different branch)
    
    const c = new Complex(1, 1);
    const result = c.asec();
    
    // The expected result for asec(1+i):
    // asec(z) = acos(1/z)
    // 1/(1+i) = (1-i)/2 = 0.5 - 0.5i
    // acos(0.5 - 0.5i) can be computed
    // Using the formula: asec(z) = acos(z^{-1}) = acos(a/d - ib/d)
    // where d = a^2 + b^2 = 2
    // so acos(0.5 - 0.5i)
    
    // Compute expected value using acos of inverse
    const inv = new Complex(1 / 2, -1 / 2); // 1/(1+i) = (1-i)/2
    const expected = inv.acos();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});