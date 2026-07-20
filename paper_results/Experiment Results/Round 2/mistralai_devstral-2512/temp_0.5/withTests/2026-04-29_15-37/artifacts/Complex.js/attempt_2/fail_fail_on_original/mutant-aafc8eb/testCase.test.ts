import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const x = 0.1;
    const c = new Complex(x, 0);
    const expm1Result = c.expm1();
    const cosm1Result = expm1Result.re - (Math.cos(x) - 1.0);
    expect(cosm1Result).toBeCloseTo(0, 10);
  });
});