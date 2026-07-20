import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const c = new Complex(0.0001, 0);
    const result = c.expm1();
    const expectedReal = Math.expm1(0.0001);
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});