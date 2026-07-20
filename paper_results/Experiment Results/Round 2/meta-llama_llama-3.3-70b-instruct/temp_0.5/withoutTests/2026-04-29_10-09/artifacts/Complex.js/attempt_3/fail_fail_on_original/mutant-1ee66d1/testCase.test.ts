import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate acsc with a complex number that has a non-zero imaginary part', () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    const d = new Complex(0, -1);
    const result2 = d.acsc();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(Math.PI / 2, 10);
  });
});