import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should parse complex numbers with newline characters correctly', () => {
    const complexNumber = new Complex('1+2i\n');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
  });

  it('should not parse complex numbers with invalid input', () => {
    expect(() => new Complex('1+2i\t')).toThrow();
  });

  it('should parse complex numbers with space characters correctly', () => {
    const complexNumber = new Complex('1 + 2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
  });

  it('should parse complex numbers with tab characters correctly', () => {
    const complexNumber = new Complex('1\t+ 2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
  });

  it('should throw an error when parsing complex numbers with invalid input', () => {
    expect(() => new Complex('1+2i invalid input')).toThrow();
  });

  it('should throw an error when parsing complex numbers with missing real part', () => {
    expect(() => new Complex('+2i')).toThrow();
  });

  it('should throw an error when parsing complex numbers with missing imaginary part', () => {
    expect(() => new Complex('1')).toThrow();
  });

  it('should throw an error when parsing complex numbers with invalid real part', () => {
    expect(() => new Complex('a+2i')).toThrow();
  });

  it('should throw an error when parsing complex numbers with invalid imaginary part', () => {
    expect(() => new Complex('1+a')).toThrow();
  });
});