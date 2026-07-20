import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("computes acsch(2+i) giving finite result", () => {
    const result = new Complex(2, 1).acsch();
    // d = 4-1 = 3, first branch: Complex(2/3, -1/3).asinh()
    const inner = new Complex(2/3, -1/3);
    const expected = inner.asinh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});