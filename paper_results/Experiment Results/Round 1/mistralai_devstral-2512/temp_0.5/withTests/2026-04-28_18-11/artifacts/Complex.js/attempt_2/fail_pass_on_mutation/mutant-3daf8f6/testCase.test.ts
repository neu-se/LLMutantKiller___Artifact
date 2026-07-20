// Test case to detect the mutation in logHypot function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js logHypot mutation test', () => {
  it('should correctly compute logHypot for values at the boundary of 3000', () => {
    // Create a complex number that will trigger the boundary condition in logHypot
    const c = new Complex(3000, 1);
    const result = c.log();
    // The real part of the log should be log(sqrt(3000^2 + 1^2)) = 0.5 * log(9000000 + 1)
    const expectedReal = 0.5 * Math.log(9000001);
    // Verify the result is close to expected (within epsilon)
    expect(Math.abs(result.re - expectedReal)).toBeLessThan(1e-10);
  });
});