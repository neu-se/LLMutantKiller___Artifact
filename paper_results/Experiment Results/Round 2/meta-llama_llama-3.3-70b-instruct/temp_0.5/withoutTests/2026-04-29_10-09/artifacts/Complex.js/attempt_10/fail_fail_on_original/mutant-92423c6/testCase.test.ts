import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const x = 0.1;
    const complex = new Complex(x);
    const result = complex.cos().sub(1);
    const originalResult = new Complex(Math.cos(x) - 1, 0);
    expect(Math.abs(result.re - originalResult.re)).toBeGreaterThan(1e-10);
    expect(Math.abs(result.im - originalResult.im)).toBeLessThan(1e-10);
  });
});