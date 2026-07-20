import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex';

describe('Complex', () => {
  it('should calculate expm1 correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.expm1();
    expect(result.re).toBeCloseTo(Math.expm1(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});