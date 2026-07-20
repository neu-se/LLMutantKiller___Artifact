import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should parse a string complex number correctly', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBeCloseTo(1);
    expect(complexNumber.im).toBeCloseTo(2);
  });

  it('should throw an error when parsing an invalid string', () => {
    const complexNumber = new Complex('1+');
    expect(complexNumber.re).toBe(0);
    expect(complexNumber.im).toBe(0);
  });
});