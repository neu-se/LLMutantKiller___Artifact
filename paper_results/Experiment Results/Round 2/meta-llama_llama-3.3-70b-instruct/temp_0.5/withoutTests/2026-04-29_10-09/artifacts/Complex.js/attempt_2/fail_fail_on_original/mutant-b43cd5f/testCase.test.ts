import { Complex } from "../complex.js";

describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings with newline characters', () => {
    const complexNumber = new Complex('1+2i\n');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
  });
});