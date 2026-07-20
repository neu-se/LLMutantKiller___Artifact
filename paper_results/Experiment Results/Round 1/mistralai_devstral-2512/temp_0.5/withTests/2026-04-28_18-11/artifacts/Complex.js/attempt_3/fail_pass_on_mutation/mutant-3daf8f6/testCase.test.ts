// Test case to detect the mutation in logHypot function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js logHypot mutation test', () => {
  it('should correctly compute logHypot for values exactly at 3000', () => {
    // Create a complex number with both components exactly at 3000
    const c = new Complex(3000, 3000);
    const result = c.log();
    // The real part should be log(sqrt(3000^2 + 3000^2)) = log(3000*sqrt(2))
    const expectedReal = Math.log(3000) + 0.5 * Math.LN2;
    // The imaginary part should be π/4 (45 degrees)
    const expectedImag = Math.PI / 4;
    // Verify both parts are close to expected (within epsilon)
    expect(Math.abs(result.re - expectedReal)).toBeLessThan(1e-10);
    expect(Math.abs(result.im - expectedImag)).toBeLessThan(1e-10);
  });
});