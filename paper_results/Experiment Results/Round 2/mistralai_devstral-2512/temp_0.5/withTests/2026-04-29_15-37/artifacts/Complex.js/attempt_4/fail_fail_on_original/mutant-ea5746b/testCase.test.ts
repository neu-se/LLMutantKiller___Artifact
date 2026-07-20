import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function mutation", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const x = 0.1;
    const c = new Complex(0, x);
    const result = c.expm1();
    const expectedReal = Math.cosh(x) - 1;
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});