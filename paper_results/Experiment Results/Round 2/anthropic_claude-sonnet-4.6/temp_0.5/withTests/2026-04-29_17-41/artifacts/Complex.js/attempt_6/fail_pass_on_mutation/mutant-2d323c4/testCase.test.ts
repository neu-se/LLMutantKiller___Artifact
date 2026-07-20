import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("computes acsch(2+i) matching asinh of the reciprocal", () => {
    const result = new Complex(2, 1).acsch();
    // The correct mathematical result: acsch(z) = asinh(1/z)
    // 1/(2+i) = (2-i)/5 = 0.4 - 0.2i
    const expected = new Complex(0.4, -0.2).asinh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});