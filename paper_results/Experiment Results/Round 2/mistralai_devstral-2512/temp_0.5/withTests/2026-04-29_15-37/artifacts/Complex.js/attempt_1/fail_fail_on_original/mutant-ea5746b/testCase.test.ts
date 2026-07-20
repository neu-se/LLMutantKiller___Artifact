import { Complex } from "./complex.js";

describe("cosm1 function mutation", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test with a small value where Taylor series approximation is used
    const x = 0.1;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The real part should be cos(x) - 1
    // We'll compute the expected value using Math.cos for comparison
    const expectedReal = Math.cos(x) - 1;
    // Allow for small floating point differences
    expect(result.re).toBeCloseTo(expectedReal, 10);
    // Imaginary part should be 0 for real input
    expect(result.im).toBeCloseTo(0, 10);
  });
});