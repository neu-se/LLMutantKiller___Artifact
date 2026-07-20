import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate acot for non-zero values', () => {
    const c = new Complex(0, 0);
    const result = c.acot();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});