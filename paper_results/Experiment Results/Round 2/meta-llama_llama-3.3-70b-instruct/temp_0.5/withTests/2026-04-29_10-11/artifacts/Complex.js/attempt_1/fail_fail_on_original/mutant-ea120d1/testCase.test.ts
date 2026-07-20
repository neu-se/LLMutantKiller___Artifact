import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const result1 = new Complex(a, b).log();
    const result2 = new Complex(a + 1, b).log();
    expect(result1.re).not.toBeCloseTo(result2.re, 10);
  });
});