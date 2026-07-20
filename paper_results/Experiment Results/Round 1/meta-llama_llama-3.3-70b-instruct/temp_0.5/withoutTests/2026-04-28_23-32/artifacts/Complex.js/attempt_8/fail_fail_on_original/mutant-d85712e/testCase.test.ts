import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    const complex2 = new Complex('1-2i');
    expect(complex2.re).toBe(1);
    expect(complex2.im).toBe(-2);
    const str = '1+2i';
    const parts = str.split('+');
    expect(parts[0]).toBe('1');
    expect(parts[1]).toBe('2i');
    const complex3 = new Complex(str);
    expect(complex3.re).toBe(1);
    expect(complex3.im).toBe(2);
    const str2 = '1+1i';
    const complex4 = new Complex(str2);
    expect(complex4.re).toBe(1);
    expect(complex4.im).toBe(1);
    expect(() => new Complex('1+Stryker was here!i')).toThrowError(SyntaxError);
    const complex5 = new Complex('1+1i');
    expect(complex5.re).toBe(1);
    expect(complex5.im).toBe(1);
    const complex6 = new Complex('1+1i');
    expect(complex6.re).toBe(1);
    expect(complex6.im).toBe(1);
    expect(new Complex('1+2i').im).toBe(2);
  });
});