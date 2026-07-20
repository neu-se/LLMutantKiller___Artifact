import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function behavior", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const c = new Complex("0.1+0i");
    const result = c.expm1();
    const expectedRe = Math.expm1(0.1) * Math.cos(0) + (Math.cos(0.1) - 1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});