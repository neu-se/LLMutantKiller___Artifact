import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function mutation test", () => {
  it("should correctly compute cos(x) - 1 for small x values using expm1", () => {
    // Test with a small value where the Taylor series approximation is used
    const x = 0.1;
    const c = new Complex(0, x); // Purely imaginary input
    const result = c.expm1();
    // For purely imaginary input (0 + xi), expm1 should be:
    // exp(0 + xi) - 1 = cos(x) + i*sin(x) - 1 = (cos(x) - 1) + i*sin(x)
    const expectedReal = Math.cos(x) - 1;
    const expectedImag = Math.sin(x);
    // Check both real and imaginary parts
    expect(result.re).toBeCloseTo(expectedReal, 10);
    expect(result.im).toBeCloseTo(expectedImag, 10);
  });
});