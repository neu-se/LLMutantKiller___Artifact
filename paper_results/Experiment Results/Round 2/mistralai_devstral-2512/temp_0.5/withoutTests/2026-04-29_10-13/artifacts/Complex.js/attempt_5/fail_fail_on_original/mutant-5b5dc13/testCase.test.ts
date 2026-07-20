import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should return correct result when a is non-zero and b is non-zero", () => {
    const result = new Complex(1, 1).acsch();
    const expectedRe = 0.48121182505960347;
    const expectedIm = -0.48121182505960347;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});