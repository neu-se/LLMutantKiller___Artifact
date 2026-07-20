import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for very small x values", () => {
    const c = new Complex(0.001, 0);
    const result = c.expm1();
    const expectedReal = Math.expm1(0.001) * Math.cos(0) + (Math.cos(0.001) - 1);
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});