import { Complex } from "../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const c1 = new Complex(1000, 1000);
    const c2 = new Complex(1000, 1000);
    const result1 = c1.logHypot();
    const result2 = c2.logHypot();
    expect(result1).toBeCloseTo(result2, 10);
  });
});