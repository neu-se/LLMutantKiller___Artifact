import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly for large numbers', () => {
    const complex = new Complex(3000, 3000);
    const result = complex.log();
    const originalResult = Math.log(Math.sqrt(3000**2 + 3000**2));

    expect(result.re).toBeCloseTo(originalResult, 10);
  });
});