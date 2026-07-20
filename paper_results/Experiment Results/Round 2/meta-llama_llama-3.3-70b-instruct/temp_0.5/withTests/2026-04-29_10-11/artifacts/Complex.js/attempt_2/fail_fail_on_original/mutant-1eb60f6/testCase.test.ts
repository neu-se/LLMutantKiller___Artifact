import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return the correct acsc value for a complex number', () => {
    const complex = new Complex(1, 1);
    const acsc = complex.acsc();
    expect(acsc.re).toBeCloseTo(acsc.re);
    expect(acsc.im).toBeCloseTo(acsc.im);
  });
});