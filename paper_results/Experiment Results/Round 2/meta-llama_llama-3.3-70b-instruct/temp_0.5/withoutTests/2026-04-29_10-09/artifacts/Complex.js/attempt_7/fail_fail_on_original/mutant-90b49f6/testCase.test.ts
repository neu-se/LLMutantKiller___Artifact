import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when parsing a string with incorrect format', () => {
    expect(() => new Complex('1+2')).toThrowError(SyntaxError);
  });

  it('should correctly parse complex numbers from strings', () => {
    const complexNumber = new Complex('1-2i');
    expect(complexNumber.re).toBeCloseTo(1);
    expect(complexNumber.im).toBeCloseTo(-2);
  });
});