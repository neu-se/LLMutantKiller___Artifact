import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should correctly compute acsch for a complex number with non-zero imaginary part", () => {
    // acsch(c) = log((1+sqrt(1+c^2))/c)
    // For c = 1 + i, we test that acsch gives the correct result
    // The mutation changes a/d to a*d in the new Complex(a/d, -b/d).asinh() call
    // For a = 1, b = 1, d = a*a + b*b = 2
    // Original: new Complex(1/2, -1/2).asinh()
    // Mutated:  new Complex(1*2, -1/2).asinh() = new Complex(2, -1/2).asinh()
    
    const c = new Complex(1, 1);
    const result = c.acsch();
    
    // Compute expected value manually:
    // acsch(1+i) = asinh(1/(1+i)) = asinh((1-i)/2) = asinh(0.5 - 0.5i)
    const expected = new Complex(0.5, -0.5).asinh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});