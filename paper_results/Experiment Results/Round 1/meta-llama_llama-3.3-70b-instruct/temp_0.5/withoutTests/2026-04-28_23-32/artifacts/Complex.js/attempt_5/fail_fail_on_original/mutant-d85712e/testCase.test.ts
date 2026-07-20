import { Complex } from "./complex.js";

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
    const str2 = '1-Stryker was here!i';
    const parts2 = str2.split('-');
    expect(parts2[0]).toBe('1');
    expect(parts2[1]).toBe('Stryker was here!i');
    expect(() => new Complex(str2)).toThrowError(SyntaxError);
  });
});