import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const a = 10000;
    const b = 0;
    const complex = new Complex(a, b);
    const result = complex.log();
    expect(result.re).toBeCloseTo(Math.log(a), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});