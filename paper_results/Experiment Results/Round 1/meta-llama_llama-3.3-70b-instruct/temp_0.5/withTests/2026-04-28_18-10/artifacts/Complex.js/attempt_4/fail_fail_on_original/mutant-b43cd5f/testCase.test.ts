import { Complex } from "./complex.js";

describe('Complex.js', () => {
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

  it('should parse complex numbers with newline characters correctly', () => {
    const complexNumber = new Complex('1+\n2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
  });
});