import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for purely imaginary numbers", () => {
    // Test with a purely imaginary number where cosm1 is actually used in expm1
    const y = 0.1;
    const c = new Complex(0, y);
    const result = c.expm1();

    // For purely imaginary input (0 + yi), expm1 should be:
    // expm1(0 + yi) = exp(0)*(cos(y) + i*sin(y)) - 1 = (cos(y)-1) + i*sin(y)
    // So the real part should be cos(y) - 1
    const expectedReal = Math.cos(y) - 1;
    const expectedImag = Math.sin(y);

    // The mutation changes the sign in the Taylor series calculation
    // which will affect the result for small y values
    expect(result.re).toBeCloseTo(expectedReal, 10);
    expect(result.im).toBeCloseTo(expectedImag, 10);
  });
});