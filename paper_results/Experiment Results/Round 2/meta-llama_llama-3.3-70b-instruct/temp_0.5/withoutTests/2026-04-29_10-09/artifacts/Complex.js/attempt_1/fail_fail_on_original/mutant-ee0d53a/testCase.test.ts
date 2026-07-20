import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(10000, 10000);
    const result = complex.log();
    expect(result.re).toBeCloseTo(Math.log(Math.sqrt(10000**2 + 10000**2)), 10);
    expect(result.im).toBeCloseTo(Math.atan2(10000, 10000), 10);
  });
});