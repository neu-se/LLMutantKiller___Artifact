import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly divide two complex numbers', () => {
    const c1 = new Complex(3, 4);
    const c2 = new Complex(1, 1);
    const result = c1.div(c2);
    expect(result.re).toBeCloseTo((3 * 1 - 4 * 1) / (1 * 1 + 1 * 1));
    expect(result.im).toBeCloseTo((4 * 1 + 3 * 1) / (1 * 1 + 1 * 1));
  });
});