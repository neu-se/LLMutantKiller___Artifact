import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for specific small imaginary value", () => {
    // Test with a specific small purely imaginary number where the mutation will show difference
    const y = 0.01;
    const c = new Complex(0, y);
    const result = c.expm1();

    // For purely imaginary input (0 + yi), expm1 should be:
    // expm1(0 + yi) = (cos(y)-1) + i*sin(y)
    // The real part should be cos(y) - 1
    const expectedReal = Math.cos(y) - 1;
    const expectedImag = Math.sin(y);

    // The mutation changes the Taylor series calculation in cosm1
    // Using exact comparison to catch the difference
    expect(result.re).toBe(expectedReal);
    expect(result.im).toBe(expectedImag);
  });
});