import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle logHypot correctly', () => {
    const complex = new Complex(3000, 3000);
    const result = complex.log();
    expect(result.re).toBeCloseTo(Math.log(Math.sqrt(3000 * 3000 + 3000 * 3000)), 10);
    expect(result.im).toBeCloseTo(Math.atan2(3000, 3000), 10);
  });
});