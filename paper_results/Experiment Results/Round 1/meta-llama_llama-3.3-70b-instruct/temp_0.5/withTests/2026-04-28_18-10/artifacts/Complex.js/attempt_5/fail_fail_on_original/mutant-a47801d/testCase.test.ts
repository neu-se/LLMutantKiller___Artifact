import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate atan correctly for complex numbers', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    if (result.im !== Infinity) {
      expect(result.im).toBeCloseTo(Math.PI / 2, 10);
    } else {
      throw new Error('Expected result.im to be a finite number');
    }
  });
});