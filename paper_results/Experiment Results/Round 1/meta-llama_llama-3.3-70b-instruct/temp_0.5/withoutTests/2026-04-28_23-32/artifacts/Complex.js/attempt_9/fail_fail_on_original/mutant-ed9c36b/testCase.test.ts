import { Complex } from '../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate sec correctly for a specific input', () => {
    const complex = new Complex(1, 0);
    const result = complex.sec();
    expect(result.re).toBeCloseTo(1.0, 5);
    expect(result.im).toBeCloseTo(0.0, 5);
  });
});