import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cosm1 for values where Taylor series is used", () => {
    const c = new Complex(0.1, 0);
    const result = c.expm1();
    // The mutation changes 1/40320 to 1*40320 in the Taylor series calculation
    // This should affect the result for values where the Taylor series is used
    expect(result.re).toBeCloseTo(0.10517091807564763, 12);
    expect(result.im).toBeCloseTo(0, 12);
  });
});