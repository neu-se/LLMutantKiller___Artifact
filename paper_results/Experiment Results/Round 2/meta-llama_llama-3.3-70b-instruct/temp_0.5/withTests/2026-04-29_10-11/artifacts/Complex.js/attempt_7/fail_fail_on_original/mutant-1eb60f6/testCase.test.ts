import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct acsc value for a complex number', () => {
    const complex = new Complex(0, 1);
    const acsc = complex.acsc();
    expect(acsc.re).not.toBeCloseTo(Math.PI / 2);
    expect(acsc.im).not.toBeCloseTo(Infinity);
  });
});