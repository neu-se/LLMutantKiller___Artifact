// Test case to detect mutation in cosm1 function
import { Complex } from "./complex.js";

describe('Complex.js cosm1 mutation test', () => {
  it('should correctly compute cos(x) - 1 for small x values', () => {
    // Create a complex number with a small real part to trigger the Taylor series path
    const c = new Complex(0.1, 0);
    const result = c.expm1();
    // The mutation changes 1/40320 to 1*40320, which will significantly affect the result
    // We expect the real part to be close to cos(0.1) - 1 ≈ -0.0049979169
    expect(result.re).toBeCloseTo(-0.0049979169, 6);
  });
});