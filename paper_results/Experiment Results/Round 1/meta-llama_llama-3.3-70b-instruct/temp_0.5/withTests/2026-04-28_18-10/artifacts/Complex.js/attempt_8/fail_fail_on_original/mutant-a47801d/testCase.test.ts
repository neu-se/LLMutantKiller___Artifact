import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate atan correctly for complex numbers', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    if (result.re !== 0 || result.im !== Math.PI / 2) {
      throw new Error('Expected result to be (0, π/2)');
    }
  });
});