import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate sec correctly for a specific input', () => {
    const complex = new Complex(1, 1);
    const result = complex.sec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).toBeCloseTo(0.2718281828459045, 5);
    expect(result.im).toBeCloseTo(-0.2718281828459045, 5);
  });
});