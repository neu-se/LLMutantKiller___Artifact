import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("should compute asec correctly for a complex number with non-zero imaginary part", () => {
    // Test asec(0 + 1i) - this goes through the d !== 0 branch
    // but we want to verify the function behavior
    // The mutation is in the d === 0 branch where b !== 0
    // Since d = a^2 + b^2 = 0 requires a=0 and b=0, and that's caught early,
    // let's test the normal path to ensure no regression
    const c = new Complex(0, 1);
    const result = c.asec();
    // asec(i) = acos(1/i) = acos(-i)
    const expected = new Complex(0, 1).inverse().acos();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});