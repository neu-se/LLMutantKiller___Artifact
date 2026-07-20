import { Complex } from "./complex.js";

describe('Complex number parsing', () => {
  it('should correctly parse complex numbers with negative imaginary part', () => {
    const complexNumber = new Complex('1-2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(-2);
  });
});