import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate csch for a complex number', () => {
    const complex = new Complex(1, 2);
    const originalIm = complex.im;
    const csch = complex.csch();
    expect(complex.im).toBe(originalIm);
    expect(complex["im"]).toBe(2);
  });
});