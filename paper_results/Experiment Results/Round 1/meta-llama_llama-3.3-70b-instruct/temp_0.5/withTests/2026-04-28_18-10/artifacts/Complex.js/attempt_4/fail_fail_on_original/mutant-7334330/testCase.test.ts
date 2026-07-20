import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly divide two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(1, 1);
    const result = c1.div(c2);
    expect(result.re).toBeCloseTo((1 * 1 + 2 * 1) / (1 * 1 + 1 * 1));
    expect(result.im).toBeCloseTo((2 * 1 - 1 * 1) / (1 * 1 + 1 * 1));
  });
});