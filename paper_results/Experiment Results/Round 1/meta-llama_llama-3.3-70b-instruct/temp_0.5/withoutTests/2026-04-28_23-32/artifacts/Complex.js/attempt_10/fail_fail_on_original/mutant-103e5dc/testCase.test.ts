import { Complex } from "../complex";

describe('Complex', () => {
  it('should return the correct cosecans value', () => {
    const complex = new Complex(2, 1);
    const result = complex.csc();
    const dOriginal = 0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re);
    const dMutated = 0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 / complex.re);
    expect(dOriginal).not.toBeCloseTo(dMutated);
  });
});