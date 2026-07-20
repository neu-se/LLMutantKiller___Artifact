import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech mutation detection", () => {
  it("should correctly compute asech of a complex number with non-zero imaginary part", () => {
    // For z = 1 + i:
    // d = a^2 + b^2 = 1 + 1 = 2
    // Original code: new Complex(a/d, -b/d) = new Complex(0.5, -0.5).acosh()
    // Mutated code:  new Complex(a/d, -b*d) = new Complex(0.5, -2).acosh()
    // These produce different results, so we can detect the mutation
    const z = new Complex(1, 1);
    const result = z.asech();

    // The correct value of asech(1+i) can be computed as:
    // asech(z) = acosh(1/z) = acosh((1-i)/2)
    // Let's compute the expected value using the inverse relationship
    // asech(z) = log((1 + sqrt(1-z^2)) / z)
    // For z = 1+i: 1/z = (1-i)/2 = 0.5 - 0.5i
    // acosh(0.5 - 0.5i) should give us the expected result
    const expected = new Complex(0.5, -0.5).acosh();

    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});