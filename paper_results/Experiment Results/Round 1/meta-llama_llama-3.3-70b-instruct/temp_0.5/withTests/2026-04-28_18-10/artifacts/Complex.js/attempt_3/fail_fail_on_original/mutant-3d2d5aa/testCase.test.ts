import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate acoth correctly for zero real part and non-zero imaginary part', () => {
    const complex = new Complex(0, 1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});