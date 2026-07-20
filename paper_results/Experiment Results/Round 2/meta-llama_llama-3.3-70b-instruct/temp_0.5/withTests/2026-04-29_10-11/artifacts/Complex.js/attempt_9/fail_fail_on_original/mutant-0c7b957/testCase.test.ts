import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(1, 1);
    const result2 = complex2.atanh();
    expect(result2.re).not.toBeNaN();
    expect(result2.im).not.toBeNaN();
    expect(isFinite(result2.re)).toBe(true);
    expect(isFinite(result2.im)).toBe(true);
    const complex3 = new Complex(1, 1);
    const result3 = complex3.atanh();
    expect(result3.re).not.toBeNaN();
    expect(result3.im).not.toBeNaN();
    expect(isFinite(result3.re)).toBe(true);
    expect(isFinite(result3.im)).toBe(true);
    expect(result3.re).not.toBe(result2.re);
  });
});