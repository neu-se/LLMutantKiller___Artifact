// Test case to detect mutation in cosm1 function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosm1 mutation test', () => {
  it('should correctly compute cos(x) - 1 for very small x values', () => {
    // Create a complex number with a very small real part to trigger the Taylor series path
    const c = new Complex(0.0001, 0);
    const result = c.expm1();
    // The mutation changes 1/40320 to 1*40320, which will significantly affect the result
    // For x=0.0001, cos(x)-1 should be approximately -5e-9
    // The original code should give us a value very close to this
    // The mutated code will give a completely different result
    expect(Math.abs(result.re + 5e-9)).toBeLessThan(1e-10);
  });
});