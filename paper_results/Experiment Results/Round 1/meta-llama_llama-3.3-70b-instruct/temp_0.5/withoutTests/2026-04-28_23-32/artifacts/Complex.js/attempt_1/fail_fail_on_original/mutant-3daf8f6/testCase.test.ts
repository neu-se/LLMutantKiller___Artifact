import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const a = 3000;
    const b = 0;
    const result = new Complex(a, b).log();
    expect(result.re).toBeCloseTo(Math.log(a), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});