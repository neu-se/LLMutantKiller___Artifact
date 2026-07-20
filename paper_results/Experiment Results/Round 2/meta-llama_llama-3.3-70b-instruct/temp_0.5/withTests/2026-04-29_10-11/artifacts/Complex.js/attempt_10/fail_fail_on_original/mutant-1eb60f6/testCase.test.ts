import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return a specific value when calculating acsc of zero', () => {
    const complex = new Complex(0, 0);
    const acsc = complex.acsc();
    expect(acsc.re).toBeCloseTo(Math.PI / 2);
    expect(acsc.im).toBeCloseTo(Infinity);
  });
});