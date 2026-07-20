import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot()", () => {
  it("should return correct result for acot(1, 1)", () => {
    const result = new Complex(1, 1).acot();
    expect(result.re).toBeCloseTo(0.4023594781362184, 10);
    expect(result.im).toBeCloseTo(-0.5535743588970452, 10);
  });
});