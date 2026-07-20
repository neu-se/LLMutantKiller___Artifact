import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should correctly compute asech for a complex number with non-zero imaginary part", () => {
    // For z = 0.5 + 1i, asech(z) should give a specific result
    // The mutation changes a/d to a*d in the asech computation,
    // which will produce a different result
    const z = new Complex(0.5, 1);
    const result = z.asech();
    
    // Compute expected value: asech(0.5 + i) = acosh(1 / (0.5 + i))
    // 1 / (0.5 + i) = (0.5 - i) / (0.25 + 1) = (0.5 - i) / 1.25 = 0.4 - 0.8i
    // So we expect asech(0.5 + i) = acosh(0.4 - 0.8i)
    const expected = new Complex(0.4, -0.8).acosh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});