import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function behavior", () => {
  it("should correctly compute cos(x) - 1 for x = 0.000000001", () => {
    const c = new Complex("0.000000001+0i");
    const result = c.expm1();
    const expectedRe = Math.expm1(0.000000001) * Math.cos(0) + (Math.cos(0.000000001) - 1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});