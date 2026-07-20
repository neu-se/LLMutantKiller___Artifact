import { Complex } from './complex.js';

describe('Complex', () => {
  it('should handle atanh correctly', () => {
    const c = new Complex(1, 0);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});