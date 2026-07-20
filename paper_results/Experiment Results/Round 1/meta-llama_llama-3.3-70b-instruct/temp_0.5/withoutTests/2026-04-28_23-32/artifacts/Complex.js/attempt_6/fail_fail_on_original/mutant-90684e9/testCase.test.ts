import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should clone a complex number correctly', () => {
    const complex = new Complex(1, 2);
    const clone = complex.clone();
    expect(clone).toBeDefined();
    expect(clone.re).toBeDefined();
    expect(clone.im).toBeDefined();
    expect(clone.re).toEqual(complex.re);
    expect(clone.im).toEqual(complex.im);
  });
});