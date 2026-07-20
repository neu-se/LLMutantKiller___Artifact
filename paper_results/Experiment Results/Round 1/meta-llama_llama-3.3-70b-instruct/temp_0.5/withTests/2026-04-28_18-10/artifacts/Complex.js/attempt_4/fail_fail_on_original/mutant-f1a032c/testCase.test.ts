import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly floor the imaginary part of a complex number', () => {
    const complex = new Complex(1.5, 2.7);
    const floored = complex.floor(1);
    expect(floored.im).toBeCloseTo(2.7);
  });
});