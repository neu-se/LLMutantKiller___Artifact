import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate csc for a complex number', () => {
    const complex = new Complex(1, 1);
    const cscOriginal = complex.csc();
    const dOriginal = 0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re);
    const cscMutated = complex.csc();
    const dMutated = 0.5 / Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re);
    expect(cscOriginal.re).not.toBeCloseTo(cscMutated.re);
    expect(cscOriginal.im).not.toBeCloseTo(cscMutated.im);
    expect(dOriginal).not.toBeCloseTo(dMutated);
  });
});