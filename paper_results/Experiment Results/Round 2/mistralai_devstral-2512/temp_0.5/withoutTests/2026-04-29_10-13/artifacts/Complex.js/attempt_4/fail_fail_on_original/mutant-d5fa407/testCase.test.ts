import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot()", () => {
  it("should return correct result for acot(0, 1)", () => {
    const result = new Complex(0, 1).acot();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-0.5 * Math.log(2), 10);
  });
});