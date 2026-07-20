import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should correctly compute asech for a complex number with non-zero imaginary part", () => {
    // For z = 0.5 + 0.5i, asech(z) should be computed correctly
    // The mutation changes `-b / d` to `-b * d` in the asech implementation
    // where d = a*a + b*b
    // For a = 0.5, b = 0.5: d = 0.25 + 0.25 = 0.5
    // Original: new Complex(a/d, -b/d) = new Complex(1, -1)
    // Mutated:  new Complex(a*d, -b*d) = new Complex(0.25, -0.25)
    // These will produce different acosh results

    const z = new Complex(0.5, 0.5);
    const result = z.asech();

    // Compute expected value: asech(0.5 + 0.5i)
    // Using the formula: asech(z) = acosh(1/z)
    // 1/z = 1/(0.5+0.5i) = (0.5-0.5i)/(0.5^2+0.5^2) = (0.5-0.5i)/0.5 = 1-i
    // acosh(1-i) should give a specific value
    const expected = new Complex(1, -1).acosh();

    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});