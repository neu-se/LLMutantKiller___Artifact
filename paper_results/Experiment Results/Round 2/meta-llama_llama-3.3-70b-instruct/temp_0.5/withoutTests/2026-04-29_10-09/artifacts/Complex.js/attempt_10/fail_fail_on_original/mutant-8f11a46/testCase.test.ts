import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should parse a complex number from a string correctly', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBeCloseTo(1);
    expect(complex.im).toBeCloseTo(2);
  });

  it('should not throw an error when parsing an invalid string', () => {
    const complex = new Complex('1+2x');
    expect(complex.re).toBeCloseTo(0);
    expect(complex.im).toBeCloseTo(0);
  });
});