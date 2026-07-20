import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should clone a complex number correctly', () => {
    const complex = new Complex(1, 2);
    const clone = complex.clone();
    expect(clone.re).toBe(1);
    expect(clone.im).toBe(2);
    expect(clone.re).not.toBe(complex.re);
    expect(clone.im).not.toBe(complex.im);
  });
});