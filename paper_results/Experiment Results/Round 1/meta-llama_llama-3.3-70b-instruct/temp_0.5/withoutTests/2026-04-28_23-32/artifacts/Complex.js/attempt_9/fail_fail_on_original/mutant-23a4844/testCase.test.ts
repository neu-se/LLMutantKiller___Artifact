import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for a complex number', () => {
    const complex = new Complex(-1.1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-0.9463097366024018);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(-1, 0);
    const result2 = complex2.atanh();
    expect(result2.re).toBeCloseTo(-Infinity);
    expect(result2.im).toBeCloseTo(0);
    const complex3 = new Complex(-1.5, 0);
    const result3 = complex3.atanh();
    expect(result3.re).toBeCloseTo(-0.5493061443340548);
    expect(result3.im).toBeCloseTo(0);
    const complex4 = new Complex(-1, 0);
    const result4 = complex4.atanh();
    expect(result4.re).not.toBe(0);
  });
});