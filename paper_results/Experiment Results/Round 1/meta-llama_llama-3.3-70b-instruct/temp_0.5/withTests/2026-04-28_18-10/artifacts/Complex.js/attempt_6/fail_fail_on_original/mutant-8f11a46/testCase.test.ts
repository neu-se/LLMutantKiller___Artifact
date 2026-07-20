import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should not parse an invalid string without throwing an error', () => {
    const complexNumber = new Complex('1+');
    expect(complexNumber.re).not.toBe(0);
    expect(complexNumber.im).not.toBe(0);
  });
});