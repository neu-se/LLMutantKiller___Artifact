import { Complex } from "../complex";

describe('Complex', () => {
  it('should calculate cos(x) - 1 correctly for small values of x using the cosm1 function', () => {
    const x = 0.000001;
    const complex = new Complex(x);
    const result = complex.cosm1();
    const expected = new Complex(-0.5 * x * x, 0);
    expect(result.equals(expected)).toBe(true);
  });
});