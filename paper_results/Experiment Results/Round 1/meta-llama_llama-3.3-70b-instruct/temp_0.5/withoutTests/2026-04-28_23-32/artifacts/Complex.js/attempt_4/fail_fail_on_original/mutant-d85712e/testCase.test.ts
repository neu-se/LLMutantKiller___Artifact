import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    const complex2 = new Complex('1-2i');
    expect(complex2.re).toBe(1);
    expect(complex2.im).toBe(-2);
    const complex3 = new Complex('1+1i');
    expect(complex3.re).toBe(1);
    expect(complex3.im).toBe(1);
    expect(() => new Complex('1+Stryker was here!i')).toThrowError(SyntaxError);
  });
});