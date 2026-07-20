import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot()", () => {
  it("should return correct result for acot(1, 0)", () => {
    const result = new Complex(1, 0).acot();
    expect(result.re).toBeCloseTo(Math.atan2(1, 1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});