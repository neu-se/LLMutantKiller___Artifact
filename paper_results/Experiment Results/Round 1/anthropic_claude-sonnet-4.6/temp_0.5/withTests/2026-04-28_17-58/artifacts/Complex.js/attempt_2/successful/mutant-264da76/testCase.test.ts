import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth for a complex number with non-zero imaginary part", () => {
    // acoth(2 + i): a=2, b=1, d=5
    // Original uses -b/d = -0.2 as imaginary part before atanh
    // Mutated uses -b*d = -5 as imaginary part before atanh
    // These produce very different results
    const result = new Complex(2, 1).acoth();

    // Verify against known identity: acoth(z) = atanh(1/z)
    // 1/(2+i) = (2-i)/5 = 0.4 - 0.2i
    const expected = new Complex(0.4, -0.2).atanh();

    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});