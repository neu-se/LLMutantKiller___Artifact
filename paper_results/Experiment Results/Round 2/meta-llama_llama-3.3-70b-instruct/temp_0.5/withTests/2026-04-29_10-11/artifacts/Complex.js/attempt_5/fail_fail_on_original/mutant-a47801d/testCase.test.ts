import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should return Infinity for atan when the real part is 0 and the imaginary part is 1 in the original code', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});