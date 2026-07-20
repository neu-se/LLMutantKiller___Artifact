import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function mutation test", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test with a small value where the Taylor series approximation is used
    const x = 0.1;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The real part should be cos(x) - 1
    // We'll compare with the direct computation
    const expectedReal = Math.cos(x) - 1;
    // The imaginary part should be 0 for real input
    expect(result.im).toBeCloseTo(0, 10);
    // The real part should match the expected value
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});