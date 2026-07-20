import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should correctly compute asech for a complex number with nonzero imaginary part", () => {
    // For z = 2 + i, asech(z) should use a/d and -b/d (not -b*d) in the intermediate step
    // d = a^2 + b^2 = 4 + 1 = 5
    // Original: intermediate = (2/5) + (-1/5)i = (0.4 - 0.2i)
    // Mutated:  intermediate = (2/5) + (-1*5)i = (0.4 - 5i)
    // These produce very different acosh results
    const z = new Complex(2, 1);
    const result = z.asech();

    // Compute expected value: asech(2+i) = acosh(1/(2+i))
    // 1/(2+i) = (2-i)/5 = 0.4 - 0.2i
    const expected = new Complex(0.4, -0.2).acosh();

    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});