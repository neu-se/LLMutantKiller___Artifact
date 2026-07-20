import { Complex } from '../complex';

describe('Complex', () => {
  it('should handle atanh correctly for specific input', () => {
    const complex = new Complex(-1.5, 0);
    const result = complex.atanh();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(-1, 0);
    const result2 = complex2.atanh();
    expect(result2.re).toBeCloseTo(-Infinity, 10);
    expect(result2.im).toBeCloseTo(0, 10);
    const complex3 = new Complex(2, 0);
    const result3 = complex3.atanh();
    expect(result3.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result3.im).toBeCloseTo(0, 10);
  });
});