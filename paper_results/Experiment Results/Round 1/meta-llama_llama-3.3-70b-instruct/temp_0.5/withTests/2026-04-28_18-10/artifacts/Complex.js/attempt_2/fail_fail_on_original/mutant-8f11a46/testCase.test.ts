import { Complex } from "../../complex.js";

describe('Complex.js', () => {
  it('should parse a string complex number correctly', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBeCloseTo(1);
    expect(complexNumber.im).toBeCloseTo(2);
  });

  it('should throw an error when parsing an invalid string', () => {
    expect(() => new Complex('1+')).toThrowError(SyntaxError);
  });
});