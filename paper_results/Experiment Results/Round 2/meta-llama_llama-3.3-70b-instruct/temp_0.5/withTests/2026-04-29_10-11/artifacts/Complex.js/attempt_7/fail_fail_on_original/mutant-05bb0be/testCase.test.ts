import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for atanh', () => {
    const c = new Complex(0.5, 0);
    const result = c.atanh();
    const expected = new Complex(0.5493061443340548, 0);
    expect(Math.abs(result.re - expected.re)).toBeLessThan(1e-6);
    expect(Math.abs(result.im - expected.im)).toBeLessThan(1e-6);
    const d = new Complex(-0.5, 0);
    const result2 = d.atanh();
    const expected2 = new Complex(-0.5493061443340548, 0);
    expect(Math.abs(result2.re - expected2.re)).toBeLessThan(1e-6);
    expect(Math.abs(result2.im - expected2.im)).toBeLessThan(1e-6);
  });
});