import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should return correct result when a is non-zero and b is non-zero", () => {
    const result = new Complex(1, 1).acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347, 10);
    expect(result.im).toBeCloseTo(-0.48121182505960347, 10);
  });
});