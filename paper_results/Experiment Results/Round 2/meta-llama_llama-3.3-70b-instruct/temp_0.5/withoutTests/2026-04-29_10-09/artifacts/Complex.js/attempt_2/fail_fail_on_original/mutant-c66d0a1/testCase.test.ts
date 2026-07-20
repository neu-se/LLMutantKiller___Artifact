import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should calculate the complex acsc correctly for non-zero complex numbers', () => {
    const complex = new Complex(1, 1);
    const acsc = complex.acsc();
    expect(acsc.re).not.toBe(0);
    expect(acsc.im).not.toBe(0);
  });
});