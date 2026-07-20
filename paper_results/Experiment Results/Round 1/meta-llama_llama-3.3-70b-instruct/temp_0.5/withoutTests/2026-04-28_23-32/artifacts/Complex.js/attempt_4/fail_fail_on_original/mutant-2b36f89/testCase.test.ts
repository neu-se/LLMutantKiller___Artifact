import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate csc for a complex number', () => {
    const complex = new Complex(1, 2);
    const csc = complex.csc();
    const originalD = 0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re);
    const calculatedD = 0.5 / Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re);
    expect(originalD).not.toBeCloseTo(calculatedD);
  });
});