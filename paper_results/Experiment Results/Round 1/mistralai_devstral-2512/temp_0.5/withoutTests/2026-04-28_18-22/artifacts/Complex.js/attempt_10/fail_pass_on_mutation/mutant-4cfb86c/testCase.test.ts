import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot", () => {
  it("should return correct result for acot(1,1)", () => {
    const result = new Complex(1, 1).acot();
    expect(result.re).toBeCloseTo(0.553574358897045);
    expect(result.im).toBeCloseTo(-0.402359478108525);
  });
});