import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for very small imaginary values", () => {
    // Test with a very small purely imaginary number where cosm1 is used
    const y = 0.001;
    const c = new Complex(0, y);
    const result = c.expm1();

    // For purely imaginary input (0 + yi), expm1 should be:
    // expm1(0 + yi) = (cos(y)-1) + i*sin(y)
    // The real part should be cos(y) - 1
    const expectedReal = Math.cos(y) - 1;
    const expectedImag = Math.sin(y);

    // The mutation changes the Taylor series calculation in cosm1
    // which will affect the real part for very small y values
    // Using high precision to catch the difference
    expect(result.re).toBeCloseTo(expectedReal, 12);
    expect(result.im).toBeCloseTo(expectedImag, 12);
  });
});