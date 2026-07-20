import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute expm1 for purely imaginary numbers", () => {
    // Test with a purely imaginary number where cosm1 is used
    const y = 0.1;
    const c = new Complex(0, y);
    const result = c.expm1();
    // For purely imaginary input, expm1 should use cosm1(y)
    // The real part should be cosm1(y) = cos(y) - 1
    const expectedReal = Math.cos(y) - 1;
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});