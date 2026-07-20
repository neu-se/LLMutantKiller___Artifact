import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cosm1 for small values", () => {
    const c = new Complex(0.1, 0);
    const result = c.expm1();
    const expectedRe = Math.expm1(0.1) * Math.cos(0) + (Math.cos(0.1) - 1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});