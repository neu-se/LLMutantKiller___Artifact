import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly for complex number (1.5, 2) and be a finite number', () => {
    const complex = new Complex(1.5, 2);
    const result = complex.atanh();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});