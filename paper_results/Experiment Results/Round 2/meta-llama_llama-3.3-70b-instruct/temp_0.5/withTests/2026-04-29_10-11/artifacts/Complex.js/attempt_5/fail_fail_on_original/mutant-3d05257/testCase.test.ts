import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate acosh for complex numbers', () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
    const d = new Complex(2, 0);
    const result2 = d.acosh();
    expect(result2.re).toBeCloseTo(result.re);
    expect(result2.im).toBeCloseTo(result.im);
  });
});