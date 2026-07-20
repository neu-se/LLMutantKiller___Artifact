import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should correctly compute acsch for a complex number with non-zero imaginary part", () => {
    // acsch(c) = log((1+sqrt(1+c^2))/c)
    // For c = 1 + i, we test that acsch returns the correct value
    // The mutation changes `a / d` to `a * d` in the new Complex constructor call
    // where d = a*a + b*b, so for a=1, b=1, d=2
    // Original: new Complex(a/d, -b/d) = new Complex(0.5, -0.5)
    // Mutated:  new Complex(a*d, -b/d) = new Complex(2, -0.5)
    
    const c = new Complex(1, 1);
    const result = c.acsch();
    
    // The expected value of acsch(1+i) can be computed as:
    // acsch(z) = asinh(1/z) = asinh(1/(1+i)) = asinh((1-i)/2)
    // 1/(1+i) = (1-i)/2 = 0.5 - 0.5i
    // asinh(0.5 - 0.5i)
    const expected = new Complex(0.5, -0.5).asinh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});