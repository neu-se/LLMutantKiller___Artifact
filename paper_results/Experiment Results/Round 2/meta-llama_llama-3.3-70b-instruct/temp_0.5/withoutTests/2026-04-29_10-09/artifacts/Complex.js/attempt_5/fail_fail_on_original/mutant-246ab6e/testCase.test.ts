import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(-1, 0);
    const result = complex.cosh();
    const originalResult = (Math.exp(-1) + Math.exp(1)) / 2;
    expect(result.re).toBeCloseTo(originalResult);
    expect(result.im).toBeCloseTo(0);
  });
});