import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should parse complex numbers with newline characters correctly', () => {
    const complexNumber = new Complex('1+2i\n');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
  });
});