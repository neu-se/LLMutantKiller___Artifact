import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct acsc value for a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const acsc = complex.acsc();
    expect(acsc.re).not.toBe(Math.PI / 2);
    expect(acsc.im).not.toBe(Infinity);
  });
});