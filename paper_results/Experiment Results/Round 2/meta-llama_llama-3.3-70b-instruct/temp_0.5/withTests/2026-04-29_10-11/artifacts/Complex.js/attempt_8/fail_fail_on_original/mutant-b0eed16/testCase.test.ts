import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const c = new Complex(1, 0);
    const result = c.sec();
    const expected = new Complex(
      1 / Math.cos(1),
      0
    );
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});