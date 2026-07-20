import { Complex } from "./complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test a small value where the Taylor series approximation should be used
    const x = 0.1;
    const expected = Math.cos(x) - 1.0;
    // We need to access the internal cosm1 function through a complex number operation
    // that uses it. The expm1 function uses cosm1 internally.
    const c = new Complex(x, 0);
    const expm1Result = c.expm1();
    // expm1(x) = exp(x) - 1, but for complex numbers with im=0, it's expm1(x) + cosm1(0)
    // Since cosm1(0) should be 0, expm1Result.re should be Math.expm1(x)
    // But we can't directly test cosm1, so we test a value where the mutation would cause
    // a significant difference in the Taylor series calculation
    const c2 = new Complex(0, x);
    const expm1Imaginary = c2.expm1();
    // For purely imaginary numbers, expm1 should use cosm1
    // The mutation changes the Taylor series coefficients, which should affect the result
    expect(expm1Imaginary.re).toBeCloseTo(Math.expm1(0) * Math.cos(x) + (Math.cos(x) - 1.0));
    expect(expm1Imaginary.im).toBeCloseTo(Math.exp(0) * Math.sin(x));
  });
});