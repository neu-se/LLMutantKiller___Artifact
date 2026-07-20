import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for atan when the real part is 0 and the imaginary part is 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});