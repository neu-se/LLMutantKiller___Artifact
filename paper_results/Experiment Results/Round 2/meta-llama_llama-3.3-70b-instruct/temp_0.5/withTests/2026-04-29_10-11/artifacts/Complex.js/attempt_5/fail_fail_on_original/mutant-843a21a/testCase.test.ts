import { Complex } from './complex';

describe('Complex', () => {
  it('asech should return the correct result for a non-zero complex number', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Infinity);
    const complex2 = new Complex(0.5, 0);
    const result2 = complex2.asech();
    expect(result2.re).toBeGreaterThan(0);
    expect(result2.im).toBeCloseTo(0);
    const complex3 = new Complex(0, 0);
    const result3 = complex3.asech();
    expect(result3.re).toBeCloseTo(0);
    expect(result3.im).toBeCloseTo(Infinity);
  });
});