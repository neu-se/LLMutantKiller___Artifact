import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const complex2 = new Complex(0, 0);
    const result2 = complex2.acoth();
    expect(isNaN(result2.re)).toBe(true);
    expect(isNaN(result2.im)).toBe(true);
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toEqual(result2.re);
    expect(result.im).not.toEqual(result2.im);
    const complex3 = new Complex(1, 0);
    const result3 = complex3.acoth();
    expect(result3.re).not.toBeNaN();
    expect(result3.im).not.toBeNaN();
    expect(result3.re).not.toEqual(result2.re);
    expect(result3.im).not.toEqual(result2.im);
  });
});