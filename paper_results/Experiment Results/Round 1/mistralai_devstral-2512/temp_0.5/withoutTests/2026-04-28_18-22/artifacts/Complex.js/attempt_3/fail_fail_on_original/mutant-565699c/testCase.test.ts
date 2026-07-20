import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test with a small value where Taylor series approximation is used
    const x = 0.1;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The real part should be cosm1(x) which uses the Taylor series
    // The mutation changes division to multiplication, which will make the result much larger
    // We need to check if the result is reasonable for the original implementation
    expect(Math.abs(result.re - (Math.cos(x) - 1))).toBeLessThan(1e-5);
  });
});