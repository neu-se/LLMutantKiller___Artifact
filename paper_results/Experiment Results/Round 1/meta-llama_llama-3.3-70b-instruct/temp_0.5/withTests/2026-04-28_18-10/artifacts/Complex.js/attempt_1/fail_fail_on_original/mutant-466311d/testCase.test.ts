import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(1000, 1000);
    const result = complex.log();
    expect(result.re).toBeCloseTo(Math.log(Math.sqrt(1000 * 1000 + 1000 * 1000)), 10);
  });
});