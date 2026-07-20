import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should return the correct result for atanh', () => {
    const c = new Complex(0.5, 0);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
    const d = new Complex(-0.5, 0);
    const result2 = d.atanh();
    expect(result2.re).toBeCloseTo(-0.5493061443340548);
    expect(result2.im).toBeCloseTo(0);
    const e = new Complex(1.5, 0);
    const result3 = e.atanh();
    expect(result3.re).not.toBeCloseTo(0.5493061443340548);
  });
});