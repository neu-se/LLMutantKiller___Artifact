import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should have the correct asinh method and not change the im property', () => {
    const complex = new Complex(1, 2);
    const originalIm = complex.im;
    complex.asinh();
    expect(complex.im).toBe(originalIm);
  });
});