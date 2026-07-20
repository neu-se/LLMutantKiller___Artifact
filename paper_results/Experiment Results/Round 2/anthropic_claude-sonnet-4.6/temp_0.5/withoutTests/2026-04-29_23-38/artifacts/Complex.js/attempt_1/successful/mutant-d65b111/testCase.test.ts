import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should correctly compute asech for a complex number with both real and imaginary parts", () => {
    // For asech, the computation uses d = a*a + b*b (original)
    // The mutation changes it to d = a*a + b/b
    // We need a case where a != 0 and b != 0 so the mutation produces a different result
    // Choose a = 2, b = 2:
    //   original: d = 4 + 4 = 8
    //   mutated:  d = 4 + 1 = 5
    // This leads to different values passed to acosh, producing different results

    const c = new Complex(2, 2);
    const result = c.asech();

    // Compute expected value manually:
    // asech(z) = acosh(1/z)
    // 1/z for z = 2+2i: d = 4+4 = 8, so 1/z = (2/8) + (-2/8)i = 0.25 - 0.25i
    const oneOverZ = new Complex(2, 2).inverse();
    const expected = oneOverZ.acosh();

    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});