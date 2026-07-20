import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should correctly compute acsch for a complex number with non-zero imaginary part", () => {
    // acsch(c) = log((1+sqrt(1+c^2))/c)
    // The mutation changes a/d to a*d in the real part of the intermediate computation
    // For c = 1 + i:
    //   d = a^2 + b^2 = 1 + 1 = 2
    //   original: new Complex(a/d, -b/d) = new Complex(0.5, -0.5)
    //   mutated:  new Complex(a*d, -b/d) = new Complex(2, -0.5)
    // These will produce very different asinh results
    
    const c = new Complex(1, 1);
    const result = c.acsch();
    
    // The expected value of acsch(1+i) can be computed as:
    // acsch(z) = log(1/z + sqrt(1/z^2 + 1))
    // Let's verify against known mathematical result
    // acsch(1+i) ≈ 0.5306375309525178 - 0.4522784471511907i
    
    expect(result.re).toBeCloseTo(0.5306375309525178, 10);
    expect(result.im).toBeCloseTo(-0.4522784471511907, 10);
  });
});