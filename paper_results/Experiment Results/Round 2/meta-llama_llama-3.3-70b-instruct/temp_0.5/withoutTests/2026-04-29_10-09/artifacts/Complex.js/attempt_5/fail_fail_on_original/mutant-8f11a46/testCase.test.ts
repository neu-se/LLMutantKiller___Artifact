import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should parse a complex number from a string correctly', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBeCloseTo(1);
    expect(complex.im).toBeCloseTo(2);
    const complex2 = new Complex('2');
    expect(complex2.re).toBeCloseTo(2);
    expect(complex2.im).toBeCloseTo(0);
  });

  it('should throw an error when parsing an invalid string', () => {
    try {
      new Complex('1+2x');
      expect(false).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(SyntaxError);
    }
  });
});