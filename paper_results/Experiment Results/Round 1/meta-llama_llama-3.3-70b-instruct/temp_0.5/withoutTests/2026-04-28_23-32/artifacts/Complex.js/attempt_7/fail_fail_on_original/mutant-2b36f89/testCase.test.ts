import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate csc for a complex number', () => {
    const complex = new Complex(1, 1);
    const csc = complex.csc();
    const d = 0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re);
    expect(d).toBeCloseTo(0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re));
  });
});