// Test case to detect mutation in cosm1 function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosm1 mutation test', () => {
  it('should correctly compute cos(x) - 1 for x near π/4', () => {
    // Create a complex number with real part near π/4 to test the boundary condition
    const c = new Complex(Math.PI/4 - 0.01, 0);
    const result = c.expm1();
    // The mutation changes 1/40320 to 1*40320 in the Taylor series
    // This will cause incorrect results near the boundary where the function switches methods
    // For x = π/4 - 0.01, cos(x)-1 should be approximately -0.207106781
    expect(result.re).toBeCloseTo(-0.207106781, 6);
  });
});