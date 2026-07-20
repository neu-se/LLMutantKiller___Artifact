import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should clone a complex number correctly', () => {
    const complex = new Complex(1, 2);
    const clone = complex.clone();
    expect(clone).toBeDefined();
    expect(clone.re).toBeDefined();
    expect(clone.im).toBeDefined();
    expect(clone.re).toEqual(1);
    expect(clone.im).toEqual(2);
    complex.re = 3;
    complex.im = 4;
    expect(clone.re).toEqual(1);
    expect(clone.im).toEqual(2);
  });
});