import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should compute asech correctly for a complex number with non-zero real and imaginary parts", () => {
    // For z = 0.5 + 0.5i, asech(z) should produce a specific result
    // The mutation changes `a / d` to `a * d` in the intermediate computation,
    // which produces a different result
    const z = new Complex(0.5, 0.5);
    const result = z.asech();

    // Compute expected value: asech(0.5 + 0.5i)
    // d = a*a + b/b = 0.25 + 1 = 1.25
    // intermediate = new Complex(0.5/1.25, -0.5/1.25) = new Complex(0.4, -0.4)
    // result = intermediate.acosh()
    const expected = new Complex(0.4, -0.4).acosh();

    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});