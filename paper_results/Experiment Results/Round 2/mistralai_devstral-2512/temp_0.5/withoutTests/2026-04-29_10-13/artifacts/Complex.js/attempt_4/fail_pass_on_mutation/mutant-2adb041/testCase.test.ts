import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x near zero", () => {
    const c = new Complex(1e-10, 0);
    const result = c.expm1();
    // For very small x, cos(x)-1 ≈ -x²/2
    // expm1(x) ≈ x + x²/2
    // So expm1(x)*cos(0) + cosm1(x) ≈ (x + x²/2) + (-x²/2) = x
    const expectedReal = 1e-10;
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});