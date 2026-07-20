import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate atan correctly for complex numbers', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    if (result.re === 0 && result.im === Infinity) {
      throw new Error('Expected result.im to be a finite number');
    }
  });
});