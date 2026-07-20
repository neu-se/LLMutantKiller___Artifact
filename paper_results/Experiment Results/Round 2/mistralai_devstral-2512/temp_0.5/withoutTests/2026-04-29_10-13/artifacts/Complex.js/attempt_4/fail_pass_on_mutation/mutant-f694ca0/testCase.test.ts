import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cosm1 for small values", () => {
    const c = new Complex(0.1, 0);
    const result = c.expm1();
    expect(result.re).toBeCloseTo(0.10517091807564763, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});