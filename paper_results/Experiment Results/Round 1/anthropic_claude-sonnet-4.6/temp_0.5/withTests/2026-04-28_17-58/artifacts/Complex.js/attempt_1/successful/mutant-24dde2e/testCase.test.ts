import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should correctly compute asec for a complex number with non-zero imaginary part", () => {
    // For asec(2 + i), the computation uses d = a*a + b*b = 4 + 1 = 5
    // The mutation changes this to d = a*a - b*b = 4 - 1 = 3
    // This produces different results for the acos call
    const z = new Complex(2, 1);
    const result = z.asec();

    // The expected value of asec(2+i) can be computed as acos(1/(2+i))
    // 1/(2+i) = (2-i)/(4+1) = (2-i)/5 = 0.4 - 0.2i
    // acos(0.4 - 0.2i)
    const expected = new Complex(0.4, -0.2).acos();

    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});