import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const c = new Complex(0, 0);
    const result = c.sec();
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});