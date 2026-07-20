import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for exp when imaginary part is zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.exp();
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
  });
});