import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 correctly for small values of x', () => {
    const x = 0.000001;
    const complex = new Complex(x);
    const result = complex.cosm1();
    const expected = new Complex(-0.5 * x * x, 0);
    expect(result.equals(expected)).toBe(true);
  });
});