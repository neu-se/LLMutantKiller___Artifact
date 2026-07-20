import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should correctly compute asech for a complex number with non-zero imaginary part", () => {
    // For z = 0.5 + 0.5i, asech(z) should be computed with a/d (not a*d)
    // The mutation changes a/d to a*d in the intermediate computation
    const z = new Complex(0.5, 0.5);
    const result = z.asech();
    
    // Compute expected value: asech(z) = acosh(1/z)
    // 1/(0.5+0.5i) = (0.5-0.5i)/(0.5^2+0.5^2) = (0.5-0.5i)/0.5 = 1-i
    const expected = new Complex(1, -1).acosh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});