import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    const str = '1+Stryker was here!i';
    expect(() => new Complex(str)).toThrowError(SyntaxError);
  });
});