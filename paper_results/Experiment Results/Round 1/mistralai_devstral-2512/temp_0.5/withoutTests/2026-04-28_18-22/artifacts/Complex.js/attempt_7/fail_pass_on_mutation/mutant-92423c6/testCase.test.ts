import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = 0.1 using Taylor series approximation", () => {
    const x = 0.1;
    const c = new Complex(x, 0);
    const expm1 = c.expm1();
    // The real part of expm1 should be expm1(x)*cos(0) + cosm1(0) = expm1(x) + cosm1(0)
    // Since cosm1(0) = cos(0) - 1 = 0, we have:
    // expm1.re = expm1(x)
    // But we want to test cosm1(x) which appears in the imaginary part calculation
    // Let's test with a small imaginary component to trigger cosm1
    const c2 = new Complex(0, x);
    const expm1_2 = c2.expm1();
    // For pure imaginary input (0 + xi):
    // expm1.re = expm1(0)*cos(x) + cosm1(x) = 0 + cosm1(x)
    expect(expm1_2.re).toBeCloseTo(Math.cos(x) - 1, 10);
  });
});