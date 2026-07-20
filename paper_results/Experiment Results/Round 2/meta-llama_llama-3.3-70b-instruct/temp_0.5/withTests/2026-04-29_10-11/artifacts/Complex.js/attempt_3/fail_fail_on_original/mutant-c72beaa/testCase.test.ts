import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(Math.atan2(1, 1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});