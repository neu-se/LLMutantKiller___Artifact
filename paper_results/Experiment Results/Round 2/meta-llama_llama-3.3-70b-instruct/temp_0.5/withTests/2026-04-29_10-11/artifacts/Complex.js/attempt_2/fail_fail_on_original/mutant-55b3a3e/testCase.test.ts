import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly handle the acsc function', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});