import { Complex } from "./complex.js";

describe('Complex number parsing', () => {
  it('should correctly parse complex numbers with negative signs', () => {
    const complexNumber = new Complex('-3-4i');
    expect(complexNumber.re).toBe(-3);
    expect(complexNumber.im).toBe(-4);
  });
});