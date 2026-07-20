import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should return the correct cosecans value', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(-0.21778375782797767);
    expect(result.im).toBeCloseTo(0.12025984248089566);
    const d = 0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re);
    expect(d).not.toBeNaN();
  });
});