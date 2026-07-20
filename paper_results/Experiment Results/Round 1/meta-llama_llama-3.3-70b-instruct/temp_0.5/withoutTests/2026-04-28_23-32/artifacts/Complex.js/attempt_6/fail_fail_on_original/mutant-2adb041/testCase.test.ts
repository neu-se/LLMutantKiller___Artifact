import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate expm1 correctly', () => {
    const complex = new Complex(0.00001);
    const result = complex.expm1();
    const expectedRe = Math.exp(0.00001) - 1;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});