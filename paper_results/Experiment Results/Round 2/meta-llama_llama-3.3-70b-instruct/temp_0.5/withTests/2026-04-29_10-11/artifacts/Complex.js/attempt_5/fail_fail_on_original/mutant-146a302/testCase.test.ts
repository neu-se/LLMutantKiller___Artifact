import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.sec();
    expect(result.re).toBeCloseTo(0.5, 6);
    expect(result.im).toBeCloseTo(0, 6);
  });
});