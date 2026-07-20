import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should compute asech of a complex number correctly", () => {
    // For z = 2 + 1i:
    // d = a*a + b/b = 4 + 1 = 5
    // Original: new Complex(2/5, -1/5).acosh()
    // Mutated: new Complex(2*5, -1/5).acosh() -- completely different result
    const z = new Complex(2, 1);
    const result = z.asech();

    // The original code computes new Complex(0.4, -0.2).acosh()
    const expected = new Complex(0.4, -0.2).acosh();

    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});