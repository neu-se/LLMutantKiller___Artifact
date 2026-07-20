import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const a = 3001;
    const b = 3001;
    const complex = new Complex(a, b);
    const result = complex.log();
    expect(result.re).toBeCloseTo(Math.log(Math.sqrt(a * a + b * b)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});