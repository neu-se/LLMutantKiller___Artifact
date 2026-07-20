import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cosm1 for values near π/4", () => {
    const c = new Complex(0.785, 0); // π/4 ≈ 0.785
    const result = c.expm1();
    expect(result.re).toBeCloseTo(1.1924069407332158, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});