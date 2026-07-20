import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should return the correct result for the csc function', () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    expect(result.re).toBeCloseTo(-0.5773502691896257, 10);
    expect(result.im).toBeCloseTo(-0.5773502691896257, 10);
  });
});