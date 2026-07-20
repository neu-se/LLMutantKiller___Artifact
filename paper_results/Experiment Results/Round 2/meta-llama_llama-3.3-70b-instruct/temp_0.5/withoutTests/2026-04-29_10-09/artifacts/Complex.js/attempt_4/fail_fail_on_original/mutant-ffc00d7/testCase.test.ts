import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number string and throw an error for invalid input', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBeCloseTo(1);
    expect(complex.im).toBeCloseTo(2);
    expect(() => new Complex('')).toThrowError(SyntaxError);
  });
});